//External Imports
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

//Context
import { usePlayer } from "@context/player";
import { useLoading } from "@context/loading";

//Components
import DashboardLayout from "./dashboardLayout";

//Stylesheets
import "./dashboard.scss";

export default function Dashboard({ logOut }) {
  const { player, fetchPlayer } = usePlayer();
  const { stopLoading } = useLoading();

  console.log("render dashboard")

  //All links in the dashboard, their name and associated component
  const links = {
    "/dashboard":{
      name: "Stats",
      component: (<div>Player Stats</div>)
    },
    "/dashboard/edit-deck": {
      name: "Edit Deck",
      component: (<div>Edit Deck</div>)
    },
    "/dashboard/edit-tokens": {
      name: "Edit Tokens",
      component: (<div>Edit Tokens</div>)
    }
  };

  useEffect(() => {
    fetchPlayerInfo();
  }, []);

  async function fetchPlayerInfo() {
    await fetchPlayer({ deck_stats: true, deck_cards: true, collection_cards: true, collection_tokens: true });

    stopLoading();
  };

  if (!player) return null;

  return player ? (
    <div id="dashboard">
      <DashboardLayout 
        logOut={ logOut }
        links={ links }
      >
        <Outlet />
      </DashboardLayout>
    </div>
  ) : null;
};

