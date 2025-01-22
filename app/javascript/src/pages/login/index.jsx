import React from "react";
import { createRoot } from "react-dom/client";
import Login from "./login";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<Login />);
  document.body.appendChild(node);
});