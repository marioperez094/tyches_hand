//External Imports
import React from "react";
import { Outlet } from "react-router-dom";

//Context
import { PlayerProvider } from "@context/player";
import { CardProvider } from "@context/card";

export default function ProtectedRoutes({ isAuthenticated }) {
  console.log("render protectedRoutes")
  

  return isAuthenticated ? (
    <CardProvider>
      <PlayerProvider>
        <Outlet /> 
      </PlayerProvider>
    </CardProvider>
  ): null;
};