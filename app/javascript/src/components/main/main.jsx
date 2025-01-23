import React from "react";

export default function Main({ children }) {
  return (
    <main className="overflow-hidden h-screen bg-black flex flex-col pt-6 sm:px-2 lg:px-5">
      { children }
    </main>
  )
};