import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./home";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<Home />);
  document.body.appendChild(node);
});