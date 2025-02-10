//External Imports
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Context 
import { useLoading } from "@context/loading";
import { usePlayer } from "@context/player";

//Components
import Dashboard from "@pages/dashboard/dashboard";

//Functions
import { getRequest } from "@utils/fetchRequest";

export default function ProtectedRoutes() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { player, fetchPlayer } = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) startLoading();
    async function fetchPlayerInformation() {
      const data = await fetchPlayer({ 
        deck_stats: true, 
        deck_cards: true, 
        collection_cards: true 
      })

      stopLoading();
      console.log(player)
      if (player === false) return navigate("/", { replace: true })
    };

    fetchPlayerInformation();
  }, []);

  if (isLoading) return null;

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