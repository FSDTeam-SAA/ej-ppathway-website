"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LinkButton } from "../../../../components/ui/Button";
import { CheckIcon } from "../../../../components/ui/Icons";

const COMPLETION_KEY = "advisor_application_completed";

declare global {
  interface Window {
    fbq?: (...args: string[]) => void;
  }
}

export default function AdvisorApplicationThankYouPage() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const completion = sessionStorage.getItem(COMPLETION_KEY);
    if (completion !== "pending" && completion !== "tracked") {
      router.replace("/join-as-advisor/apply");
      return;
    }

    setConfirmed(true);
    if (completion === "tracked") return;

    const track = () => {
      if (typeof window.fbq !== "function") return false;
      sessionStorage.setItem(COMPLETION_KEY, "tracked");
      window.fbq("track", "SubmitApplication");
      return true;
    };

    if (track()) return;

    const interval = window.setInterval(() => {
      if (track()) window.clearInterval(interval);
    }, 250);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [router]);

  if (!confirmed) return null;

  return (
    <section className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl sm:p-8">
        <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckIcon size={30} />
        </div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Thank You for Applying!</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Your application has been successfully submitted and is now under review by our team. If
          your application matches our current advisor requirements, we&apos;ll contact you regarding
          the next stage of the interview process.
        </p>

        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left">
          <div className="mb-3 text-sm font-bold text-slate-900">Application Progress</div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm text-slate-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <CheckIcon size={12} />
              </span>
              Application Submitted
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white">
                <ClockIcon size={11} />
              </span>
              Review in Progress
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left text-sm text-slate-600">
          <ClockIcon size={15} className="shrink-0 text-[#0e7490]" />
          <span>
            Estimated Review Time: <b className="text-slate-800">3-5 business days</b>
          </span>
        </div>

        <p className="mt-3 text-left text-xs text-slate-500">
          <b>Note:</b> Please monitor your email and dashboard for updates regarding your
          application status.
        </p>

        <div className="mt-5">
          <LinkButton href="/join-as-advisor" variant="outline" size="md" className="w-full">
            Back to Join as Advisor
          </LinkButton>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Questions about your application?{" "}
          <Link href="/contact" className="font-semibold text-[#0e7490] hover:underline">
            Contact our team
          </Link>
        </p>
      </div>
    </section>
  );
}

function ClockIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
