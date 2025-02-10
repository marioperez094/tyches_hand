//External Imports
import React, { useEffect, useMemo } from "react";

//Components
import LoadingLine from "./loadingLine";

//Context
import { useLoading } from "@context/loading";

//Constants
import loadingScreenText from "@utils/loadingScreenText.json";

//Stylesheets
import "./loadingScreen.scss";

export default function LoadingScreen() {
  const { isLoading, showLoading } = useLoading();

  //Select a random loading text set
  const selectedLoadingLines = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * loadingScreenText.loadingScreenText.length);
    return loadingScreenText.loadingScreenText[randomIndex];
  }, []);

  if (!showLoading) return null;

  return (
    <main className="h-full">
      <ul className="w-full h-full flex flex-col justify-center items-center">
        { selectedLoadingLines.map((line, index) => 
          <LoadingLine 
            key={ index } 
            animationDelay={ index } 
            loadingLine={ line }
            isLoading={ isLoading }
          />
        )}
      </ul>
    </main>
  )
};

