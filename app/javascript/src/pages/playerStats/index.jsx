import React from "react";
import { createRoot } from "react-dom/client";
import PlayerStatsScreen from "./playerStats";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<PlayerStatsScreen />);
  document.body.appendChild(node);
});