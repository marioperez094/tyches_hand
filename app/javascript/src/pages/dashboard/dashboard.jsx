//External Imports
import React, { useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//Context
import { usePlayer } from "@context/player";

//Components
import PlayerCollections from "./playerCollections";
import DashboardLayout from "./dashboardLayout";

//Functions
import { deleteRequest } from "@utils/fetchRequest";

//Stylesheets
import "./dashboard.scss";

export default function Dashboard() {
  const currentLocation = useLocation().pathname; //Retrieves current dashboard location
  const navigate = useNavigate();

  const { deck, player } = usePlayer();

  function logOut() {
    deleteRequest("/api/sessions")
      .then(data => {
        if (data.success) return navigate("/");
      })
      .catch(error => console.log(error))
  };

  const links = {
    "/dashboard":{
      name: "Stats",
      component: <PlayerCollections player={ player }/>
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

  const title = useMemo(() => links[currentLocation]?.name || "Player Dashboard", [currentLocation]);

  const buttons = useMemo(() => {
    const filteredButtons =  Object.entries(links)
      .filter(([path]) => path !== currentLocation)
      .map(([path, values]) => ({
        name: values.name,
        link: path
      }));

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