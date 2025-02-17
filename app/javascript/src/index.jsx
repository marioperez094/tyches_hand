import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
import { LoadingProvider } from "./context/loading";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  node.id = "root";
  document.body.appendChild(node);
  const root = createRoot(node);
  root.render(<Index />);
});

function Index() {
  return (
    <LoadingProvider>
      <Router>
        <App />
      </Router>
    </LoadingProvider>
  )
};

