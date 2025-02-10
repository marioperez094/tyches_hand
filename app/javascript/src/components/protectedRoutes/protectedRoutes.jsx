//External Imports
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Context 
import { useLoading } from "@context/loading";

//Components
import Dashboard from "@pages/dashboard/dashboard";

//Functions
import { getRequest } from "@utils/fetchRequest";

export default function ProtectedRoutes() {
  const { isLoading, startLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    getRequest("/api/authenticated")
      .then(data => {
        if (!isLoading) startLoading();
        if (!data.authenticated) return navigate("/", { replace: true })
      })
  }, [])

  return (
    <Routes>
      <Route path="/dashboard/*" element={ <Dashboard /> } />
      <Route path="/game" element={ <Game /> } />
    </Routes>
  )
};


function Game() {
  return (
    <div className="text-white">Game</div>
  )
};