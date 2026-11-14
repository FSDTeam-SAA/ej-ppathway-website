import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { SupportChatWidget } from "../components/widgets/SupportChatWidget";
import { getSiteContent } from "../lib/site-content";
import { AdvisorDiscoveryRealtime } from "../components/advisor/AdvisorDiscoveryRealtime";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const global = await getSiteContent("global");
  return (
    <>
      <AdvisorDiscoveryRealtime />
      <Header global={global} />
      <main className="flex-1">{children}</main>
      <Footer global={global} />
      <SupportChatWidget />
    </>
  );
}
