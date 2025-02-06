//External Imports
import React from "react";
import { Routes, Route } from "react-router-dom";

//Components
import LoadingScreen from "@components/loadingScreen/loadingScreen";
import Login from "@pages/login/login";

//Context
import { useLoading } from "@context/loading";

//Stylesheets
import "./app.scss";

export default function App() {
  const { showLoading } = useLoading();
  
  return (
    <>
      { showLoading && <LoadingScreen /> } 

      <Routes>
        { /* Public routes */ }
        <Route path="/login" element={ <Login /> } />


        <Route path="*" element={<Login />} />
      </Routes>
    </>
  )
};