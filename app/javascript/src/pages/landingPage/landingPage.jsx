//External Imports
import React, { useEffect } from "react";

//Components
import TycheLogo from "@components/gameAssets/tycheLogo/tycheLogo";
import Login from "./login";

//Stylesheets
import "./landingPage.scss";

export default function LandingPage({ isAuthenticated, setIsAuthenticated, checkAuthentication }) {
  console.log("render landingPage");

  useEffect(() => {
    checkAuthentication();
  }, [])

  return(
    <div className="h-full flex flex-col justify-center items-center" id="landing-page">
      <div className={ !isAuthenticated ? "shift-up" : ""} >
        <TycheLogo />
      </div>

      <main className={ `main-menu-container ${ isAuthenticated === false ? "visible" : "" }` }>
        { isAuthenticated === null && null }
        { isAuthenticated === false && <Login setIsAuthenticated={ setIsAuthenticated } />}
      </main>
    </div>
  )
};