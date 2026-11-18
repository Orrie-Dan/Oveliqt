import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./app/globals.css";
import "./app/motion/motion.css";
import "./app/ditto.css";
import "./app/ui-refinement.css";

document.body.className =
  "block text-foreground [font-family:sans-serif] text-xs font-normal not-italic leading-3.5 tracking-[normal] [word-spacing:0px] text-start normal-case whitespace-normal [word-break:normal] [overflow-wrap:normal] indent-0 [text-shadow:none] [font-variant-caps:normal] [font-feature-settings:normal] list-outside [writing-mode:horizontal-tb] [direction:ltr] bg-background";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
