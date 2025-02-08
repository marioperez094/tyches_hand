//External Imports
import React from "react";

//Context
import { usePlayer } from "@context/player";

export default function Dashboard() {
  const { deck, player } = usePlayer();
  return(
    <>
      <p className="text-white">{ JSON.stringify(deck) }</p>
      <p className="text-white">{ JSON.stringify(player) }</p>
    </>
  )
};