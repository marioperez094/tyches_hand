//External Imports
import React from "react";

//Stylesheets
import "./healthBar.scss";

import { playerMaxHealth } from "@utils/constants";

export default function HealthBar({ health, isPlayer }) {
  const healthBarWidth = ( health / playerMaxHealth) * 100;
  const lowHealthEffect = healthBarWidth < 50 && isPlayer && "low-health" //The pulses faster at low health

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