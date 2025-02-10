//External Imports
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

//Components
import TycheLogo from "@components/headers/tycheLogo/tycheLogo";
import Login from "./login";

//Functions
import { getRequest } from "@utils/fetchRequest";

//Stylesheets
import "./landingPage.scss";

export default function LandingPage() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = useCallback(() => {
    getRequest("/api/authenticated")
      .then(data => {
        setIsAuthenticated(data.authenticated);

        if (data.authenticated) { 
          return navigate("/dashboard", { replace: true })
        };
      })
      .catch(error => {
        console.log(error)
        setIsAuthenticated(false);
      });
  }, [navigate]);

  useEffect(() => {
    checkAuthenticated();
  }, [])

  return(
    <div className="h-full flex flex-col justify-center items-center" id="landing-page">
      <TycheLogo />

      <main className="main-menu-container">
        { !isAuthenticated && <Login /> } { /* Only shows title if player is logged in. */ }
      </main>
    </div>
  )
};