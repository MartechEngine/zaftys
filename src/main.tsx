import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Oswald is optional eye candy — load after first paint so it never blocks LCP.
const loadHeadingFont = () => {
  void import("./styles/fonts.css");
};
const ric = window.requestIdleCallback?.bind(window);
if (typeof ric === "function") {
  ric(loadHeadingFont, { timeout: 3000 });
} else {
  window.setTimeout(loadHeadingFont, 1500);
}
