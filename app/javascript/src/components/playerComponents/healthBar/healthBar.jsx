//External Imports
import React from "react";

//Stylesheets
import "./healthBar.scss"

export default function HealthBar({ name, health, maxHealth, player }) {
  const maxNameLength = 15; 
  const healthBarWidth = (health / maxHealth) * 100;
  const shortenName = name.length < maxNameLength ? name : name.slice(0, maxNameLength) + "..."; //Shortens username if longer than 15 characters
  const playerBarShake = healthBarWidth > 35 ? "health-floating" : "low-health" //The bar shakes at low health 

  return (
    <div className={`${ player && playerBarShake }`}>
      <div className={`mx-5 text-xl font-extrabold name-container ${ player && "player-name-container" }`}>{ shortenName }</div>
      <div className="relative w-full health-bar-container">
        <div className="absolute w-full h-full">
          <div className={ `health-bar-fill ${ player && "player-blood-pool" }` } style={{ width: `${ healthBarWidth }%`}}></div>
        </div>
        { player && <div className="health-bar-text">{ health } / { maxHealth }</div> }
      </div>
    </div>
  )
};