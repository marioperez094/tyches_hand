//External Imports
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useLoading } from "@context/loading";

//Components
import TycheLogo from "@components/headers/tycheLogo/tycheLogo";
import Login from "@components/login/login";

//Functions
import { getRequest } from "@utils/fetchRequest";

//Stylesheets
import "./landingPage.scss";

export default function LandingPage() {
  const { startLoading } = useLoading();
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = useCallback(() => {
    getRequest("/api/authenticated")
      .then(data => {
        console.log(data)
        setIsAuthenticated(data.authenticated);

        if (data.authenticated) { 
          startLoading();
          return navigate("/dashboard", { replace: true })
        };
      })
      .catch(error => {
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
        { !isAuthenticated && <Login />}
      </main>
    </div>
  )
};