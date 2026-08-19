import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadAdSenseScript } from "./lib/ads";

loadAdSenseScript();

createRoot(document.getElementById("root")!).render(<App />);
