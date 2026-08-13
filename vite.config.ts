import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    react(),
    {
      name: "defer-stylesheet-for-lcp",
      enforce: "post",
      transformIndexHtml(html) {
        // Safe while React hero copy uses inline visibility:hidden when #lcp-shell exists.
        return html.replace(
          /<link rel="stylesheet"(\s[^>]*href="[^"]+\.css"[^>]*)>/g,
          '<link rel="stylesheet"$1 media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet"$1></noscript>',
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
