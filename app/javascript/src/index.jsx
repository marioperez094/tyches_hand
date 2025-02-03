import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  node.id = "root";
  document.body.appendChild(node);
  const root = createRoot(node);
  root.render(<App />);
});