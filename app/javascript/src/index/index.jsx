import React from "react";
import { createRoot } from "react-dom/client";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<Home />);
  document.body.appendChild(node);
});

const Home = () => {
  return(
    <div>Hi</div>
  )
};