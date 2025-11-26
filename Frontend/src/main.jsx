import "./index.css";

import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (rootElement && !rootElement._reactRootContainer) {
  createRoot(rootElement).render(<App />);
}
