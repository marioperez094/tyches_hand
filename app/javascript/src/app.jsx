//External Imports
import React from "react";
import { Routes, Route } from "react-router-dom";

//Context 
import { useLoading } from "@context/loading";
import { PlayerProvider } from "@context/player";

//Components
import LandingPage from "@pages/landingPage/landingPage";
import LoadingScreen from "@components/loadingScreen/loadingScreen";
import ProtectedRoutes from "@components/protectedRoutes/protectedRoutes";

//Stylesheets
import "./app.scss";

export default function App() {
  const { showLoading } = useLoading();

  return (
    <>
      { showLoading && <LoadingScreen /> }

      <Routes>
        { /* Public routes */ }
        <Route path="/" element={ <LandingPage /> } />

        <Route path="/*" 
          element={ 
            <PlayerProvider>
              <ProtectedRoutes /> 
            </PlayerProvider>
          } 
        />
      </Routes>
    </>
  )
};