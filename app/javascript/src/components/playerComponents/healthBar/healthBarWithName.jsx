//External Imports
import React from "react";

//Components
import HealthBar from "./healthBar";

//Stylesheet
import "./healthBar.scss"

export default function HealthBarWithName({ health, name, isPlayer = false }) {
  const maxNameLength = 14;
  const shortenName = name.length < maxNameLength ? name: name.slice(0, maxNameLength) + "..."; //Shortens player username

  

  return(
    <div className={ `health-bar-wrapper textured-gray-border ${ isPlayer && "player-health-bar" }` }>
      <div className={ `health-background` }>
        <HealthBar health={ health } isPlayer={ isPlayer } />
        <div className="relative name-container textured-gray-border">
          <div className="absolute w-full h-full name-background flex items-center">
            <div className={ `absolute w-full text-white text-center text-2xl name-text ${ isPlayer && "player-name-text"}` }>{ shortenName }</div>
          </div>
        </div>
      </div>
    </div>
  )
};