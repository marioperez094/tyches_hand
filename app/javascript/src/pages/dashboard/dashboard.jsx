//External Imports
import React, { useEffect, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//Context
import { usePlayer } from "@context/player";
import { useLoading } from "@context/loading";

//Components
import PlayerCollections from "./playerCollections/playerCollections";
import DashboardLayout from "./dashboardLayout";

//Functions
import { deleteRequest } from "@utils/fetchRequest";

//Stylesheets
import "./dashboard.scss";
import DeckEditor from "./deckEditor/deckEditor";

export default function Dashboard() {
  const currentLocation = useLocation().pathname; //Retrieves current dashboard location
  const { fetchPlayer } = usePlayer();
  const { stopLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlayerInformation() {
      await fetchPlayer({ deck_stats: true, deck_cards: true, collection_cards: true })
      
      stopLoading();
    }
    fetchPlayerInformation();
  }, []);

  function logOut() {
    deleteRequest("/api/sessions")
      .then(data => {
        if (data.success) return navigate("/");
      })
      .catch(error => console.log(error))
  };

  //All links in the dashboard, their name and associated component
  const links = {
    "/dashboard":{
      name: "Stats",
      component: <PlayerCollections />
    },
    "/dashboard/edit-deck": {
      name: "Edit Deck",
      component: (<DeckEditor />)
    },
    "/dashboard/edit-tokens": {
      name: "Edit Tokens",
      component: (<div>Edit Tokens</div>)
    }
  };

  //Retrieves the name of the of the current link for the header
  const title = useMemo(() => links[currentLocation]?.name || "Player Dashboard", [currentLocation]);

  //Dynamic buttons based on the current link
  const buttons = useMemo(() => {
    const filteredButtons =  Object.entries(links)
      .filter(([path]) => path !== currentLocation)
      .map(([path, values]) => ({
        name: values.name,
        link: path
      }));

      //Play and logout buttons are static but dashboard link buttons are dynamically loaded
      return ([
        { name: "Play" },
        ...filteredButtons,
        { name: "Log Out", buttonAction: logOut }
      ])

  }, [currentLocation, links, logOut]);

  return(
    <div id="dashboard">
      <DashboardLayout 
        title={ title }
        buttons={ buttons }
      >
        <Routes>
        { Object.entries(links).map(([path, values]) => {
          const removeDashboardLink = path.replace("/dashboard", "") || "/"
          
          return <Route key={ path } path={ removeDashboardLink } element={ values.component } />
        })}
        </Routes>
      </DashboardLayout>
    </div>
  )
};