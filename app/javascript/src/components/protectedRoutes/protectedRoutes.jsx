//External Imports
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Context
import { usePlayer } from "@context/player";
import { useLoading } from "@context/loading";

//Components
import Dashboard from "@pages/dashboard/dashboard";

export default function ProtectedRoutes() {
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const { player, fetchPlayer } = usePlayer();

  useEffect(() => {
    startLoading();
    async function fetchPlayerInformation() {
      await fetchPlayer();
      stopLoading();
    };

    fetchPlayerInformation();
  }, []);

  useEffect(() => {
    if (player === null) return;

    if(!player) {
      navigate("/", { replace: true })
    }
  }, [player])

  if (!player) return <p>Loading player ...</p>

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