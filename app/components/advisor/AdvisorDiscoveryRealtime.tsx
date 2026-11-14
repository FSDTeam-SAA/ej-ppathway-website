"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { SOCKET_ORIGIN } from "../../lib/api";

export const ADVISOR_DISCOVERY_REFRESH = "advisor:discovery-refresh";

export function AdvisorDiscoveryRealtime() {
  const router = useRouter();
  useEffect(() => {
    if (!SOCKET_ORIGIN) return;
    const socket = io(`${SOCKET_ORIGIN}/advisor-discovery`, {
      transports: ["websocket"], forceNew: true, autoConnect: false,
      reconnection: true, reconnectionDelay: 1000, reconnectionDelayMax: 5000,
    });
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        window.dispatchEvent(new Event(ADVISOR_DISCOVERY_REFRESH));
        router.refresh();
      }, 150);
    };
    const resume = () => {
      if (document.visibilityState !== "visible") return;
      refresh();
      if (!socket.connected) socket.connect();
    };
    socket.on("advisor:status-changed", refresh);
    socket.on("connect", refresh);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("online", resume);
    socket.connect();
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("online", resume);
      socket.disconnect();
    };
  }, [router]);
  return null;
}
