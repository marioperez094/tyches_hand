import React from "react";
import { createRoot } from "react-dom/client";
import StartScreen from "./startScreen";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<StartScreen />);
  document.body.appendChild(node);
});