//External Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

//Stylesheets
import "./hoverButtons.scss";

export default function HoverButtons({ buttonOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const arcAngle = 90; //Sets the total space from 12 to 3 on the clock
  const radius = 150; //Distance oof buttons from main button
  const numButtons = buttonOptions.length;

  function toggleMenu() {
    setIsOpen(prevState => !prevState);
  };
  
  const buttons = Array.from({ length: numButtons }, (_, index) => {
    const angle = (index / (numButtons - 1)) * arcAngle; // Distribute buttons evenly
    const angleInRadians = (angle * Math.PI) / 180; // Convert angle to radians
    const x = Math.cos(angleInRadians) * radius;
    const y = Math.sin(angleInRadians) * radius;

    return { x, y }; // Return calculated positions
  });

  return(
    <div className="fixed hover-buttons-container">
      <button 
        className="rounded-full text-white absolute main-button"
        onClick={ toggleMenu }
      >
        { isOpen ? "x" : "+"}
      </button>

      { isOpen && 
        <div className="relative hover-buttons">
          { buttons.map((position, index) => {
            const currentButton = buttonOptions[index];

            if (currentButton.isLink) return (
              <Link
                to={ currentButton.link }
                key={ index }
                className="absolute rounded-full child-button"
                style={{ transform: `translate(${ position.x }px, ${ -position.y }px)` }}
              >
                { currentButton.name }
              </Link>
            )

            const { name, buttonAction } = currentButton;

            return(
              <button
                key={ index }
                className="absolute rounded-full child-button"
                style={{ transform: `translate(${ position.x }px, ${ -position.y }px)` }}
                onClick={ buttonAction ? buttonAction : null }
              >
                { name }
              </button>
            )
          })}
        </div>
      }
    </div>
  )
};