import React from "react";
import { createRoot } from "react-dom/client";
import PlayerStats from "./playerStats";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<PlayerStats />);
  document.body.appendChild(node);
});