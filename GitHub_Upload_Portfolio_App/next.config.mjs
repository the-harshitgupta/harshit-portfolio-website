/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Published blog posts link to this slug, but the service behind it is
      // set to Hidden in the admin panel, so it was returning 404.
      // WARNING: the service still exists in the database. Redirects run before
      // page routing, so if you ever switch "ICP & Buyer Persona Research" back
      // to Published, delete this rule or the real page stays unreachable.
      {
        source: "/services/icp-buyer-persona-research",
        destination: "/services/icp-positioning-audit",
        permanent: true,
      },
      // No /resources index existed, so the folder root 404'd.
      {
        source: "/resources",
        destination: "/resources/icp-checklist",
        permanent: false,
      },
      // Posts linked from live articles that have not been written yet.
      // Temporary (307) on purpose: these become real URLs once published,
      // and a 301 would permanently hand their equity to the stand-in page.
      {
        source: "/blog/marketing-kpis-to-track",
        destination: "/services/marketing-analytics-kpis",
        permanent: false,
      },
      {
        source: "/blog/how-much-should-a-startup-spend-on-marketing",
        destination: "/blog/marketing-strategy-for-startups",
        permanent: false,
      },
      {
        source: "/blog/how-to-write-a-positioning-statement",
        destination: "/blog/what-is-product-positioning",
        permanent: false,
      },
      {
        source: "/blog/customer-research-methods",
        destination: "/blog/how-to-create-a-buyer-persona",
        permanent: false,
      },
      {
        source: "/blog/ai-content-strategy",
        destination: "/services/ai-content-strategy-system",
        permanent: false,
      },
      {
        source: "/blog/ai-marketing-tools-2026",
        destination: "/blog/chatgpt-prompts-for-marketing",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
