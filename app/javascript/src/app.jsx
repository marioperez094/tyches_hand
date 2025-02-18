//External Imports
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//Context
import { useLoading } from "@context/loading";

//Components
import LandingPage from "@pages/landingPage/landingPage";
import Dashboard from "@pages/dashboard/dashboard";
import PlayerCollections from "@pages/dashboard/playerCollections/playerCollections";
import DeckEditor from "@pages/dashboard/deckEditor/deckEditor";
import LoadingScreen from "@components/loadingScreen/loadingScreen";
import ProtectedRoutes from "@components/protectedRoutes/protectedRoutes";

//Functions
import { getRequest, deleteRequest } from "@utils/fetchRequest";

//Stylesheets
import "./app.scss";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { showLoading, startLoading } = useLoading();
  
  console.log("rendered app")
  console.log("isAuthenticated: " + isAuthenticated)

  function checkAuthentication() {
    getRequest("/api/authenticated")
      .then(data => {
        //Ensures logo is visible for 1.5s
        const delay = setTimeout(() => {
          if (data.authenticated) startLoading();

          setIsAuthenticated(data.authenticated);
          return;
        }, 1500);

        return () => clearTimeout(delay);
      })
      .catch(error => console.error(error.message));
  };

  function logOut() {
    deleteRequest("/api/sessions")
      .then(data => {
        if (data.success) return setIsAuthenticated(false);
      })
      .catch(error => console.log(error))
  };

  return (
    <>
      { /* Universal loading screen */ }
      { showLoading && <LoadingScreen />}

      <Routes>
        { isAuthenticated ? (
          <>
            <Route element={ <ProtectedRoutes isAuthenticated={ isAuthenticated } /> }>
              <Route path="/dashboard" element={ <Dashboard logOut={ logOut } /> }>
                <Route index element={ <PlayerCollections /> } />
                <Route path="edit-deck" element={ <DeckEditor /> } />
              </Route> 
            </Route>
                
            <Route path="*" element={ <Navigate to="/dashboard" replace /> } />
          </>
        ) : (
          <>
            <Route path="/" element={ 
              <LandingPage 
                isAuthenticated={ isAuthenticated }
                setIsAuthenticated={ setIsAuthenticated }
                checkAuthentication={ checkAuthentication } 
              /> 
            }/>
          
            <Route path="*" element={ <Navigate to="/" replace /> } /> 
          </>
        )}
      </Routes>
    </>
  )
};