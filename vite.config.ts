import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function injectGaSnippet() {
  return {
    name: "inject-ga-snippet",
    transformIndexHtml(html: string) {
      const id = process.env.VITE_GA_MEASUREMENT_ID?.trim();
      if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return html;
      const snippet = `
    <!-- Google tag (gtag.js) — Measurement ID from VITE_GA_MEASUREMENT_ID at build -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      window.__ZAFTS_GA_ID__ = ${JSON.stringify(id)};
      gtag('js', new Date());
      gtag('config', ${JSON.stringify(id)}, { send_page_view: true, anonymize_ip: true });
    </script>`;
      return html.replace("</head>", `${snippet}\n  </head>`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [react(), injectGaSnippet()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
