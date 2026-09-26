# Advisor recruitment launch

The website is temporarily limited to advisor recruitment. `app/lib/publicRoutes.ts`
defines the published paths used by the header and footer. `proxy.ts` redirects `/`
to `/join-as-advisor` and returns 404 for unpublished routes when
`ADVISOR_ONLY_MODE` is enabled.

The VPS also enforces the same policy in Nginx. Its current website server
configuration is preserved in `deploy/nginx/ppathway-website.conf`. The site
runs on port 3001 under the `ppathway-website` PM2 process. The Admin and
Advisor Dashboards are separate services and are unaffected by this policy.

The production environment values stay on the VPS in `.env.production.local`;
that file is intentionally ignored by Git. It has the same variable names as
the local `.env` file. Do not commit either file's values.

To open the full website again, set `ADVISOR_ONLY_MODE` to `false`, remove the
advisor-only location rules from the deployed Nginx configuration, rebuild the
website, and reload Nginx after validating its configuration. Both layers must
be changed for the other pages to become public.
