import type { IncomingMessage, ServerResponse } from "http";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/** Vite cannot run PHP. Local POST /api/partner.php otherwise returns source and the form errors. */
function mockPartnerApiInDev(): Plugin {
  return {
    name: "mock-partner-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const url = req.url?.split("?")[0];
        if (req.method !== "POST" || url !== "/api/partner.php") {
          next();
          return;
        }
        res.setHeader("Content-Type", "application/json");
        try {
          const raw = await readRequestBody(req);
          JSON.parse(raw || "{}");
        } catch {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: "Invalid request" }));
          return;
        }
        console.info("[dev] Partner enquiry accepted locally. Mail is sent only on zaftys.com.");
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, message: "Application submitted" }));
      });
    },
  };
}

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
  plugins: [react(), injectGaSnippet(), mockPartnerApiInDev()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
