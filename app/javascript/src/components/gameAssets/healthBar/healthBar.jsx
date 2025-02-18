//External Imports
import React from "react";

//Stylesheet
import "./healthBar.scss"

export function HealthBarWithName({ health, name, isPlayer = false }) {
  const maxNameLength = 14;
  const shortenName = name.length < maxNameLength ? name: name.slice(0, maxNameLength) + "..."; //Shortens player username

  console.log("render healthBarWithName")

  

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

export function HealthBar({ health, isPlayer }) {

  console.log("render healthBar")

  const playerMaxHealth = 5000;
  const healthBarWidth = ( health / playerMaxHealth) * 100;
  const lowHealthEffect = healthBarWidth < 50 && isPlayer && "low-health" //Pulses faster at low health

  return (
    <div className={ `relative health-bar-container textured-gray-border ${ lowHealthEffect }` }>
      <div className="absolute w-full h-full">
        <div className={ `health-bar-fill ${ isPlayer && "player-blood-pool" }` } style={{ width: `${ healthBarWidth }%`}} />
        { isPlayer && 
          <div className="absolute text-white text-sm font-extrabold health-bar-text">
            { health } / { playerMaxHealth }
          </div> 
        }
      </div>
    </div>
  )
};