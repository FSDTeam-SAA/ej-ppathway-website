// Temporary advisor recruitment launch. Keep this in sync with the deployed
// Nginx allowlist in deploy/nginx/ppathway-website.conf.
export const ADVISOR_ONLY_MODE = true;

const PUBLISHED_PATHS = [
  "/join-as-advisor",
  "/login",
  "/signup",
  "/advisor-onboarding",
  "/contract/sign",
  "/contact",
  "/terms",
  "/privacy",
];

export function isPublished(href?: string): boolean {
  if (!ADVISOR_ONLY_MODE) return true;
  if (!href) return false;
  if (/^(https?:|mailto:|tel:|#)/i.test(href)) return true;
  const path = href.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return PUBLISHED_PATHS.some((published) => path === published || path.startsWith(published + "/"));
}
