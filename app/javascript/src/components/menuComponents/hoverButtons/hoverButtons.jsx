//External Imports
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

//Stylesheets
import "./hoverButtons.scss";

export default function HoverButtons({ buttonOptions, arcAngle = 90, radius = 150 }) {
  const [isOpen, setIsOpen] = useState(false);
  const numButtons = buttonOptions.length;

  function toggleMenu() {
    setIsOpen(prevState => !prevState);
  };
  
  const buttons = useMemo(() =>  
    Array.from({ length: numButtons }, (_, index) => {
      const angle = (index / (numButtons - 1)) * arcAngle;
      const angleInRadians = (angle * Math.PI) / 180;
      return {
        x: Math.cos(angleInRadians) * radius,
        y: Math.sin(angleInRadians) * radius
      };
    }),
    [numButtons, arcAngle, radius]
  );

  const reversedButtonOptions = useMemo(() => [...buttonOptions].reverse(), [buttonOptions]);

  console.log("render hoverButtons")

  return(
    <div className="fixed hover-buttons-container">
      { /* Main Toggle button */ }
      <button 
        className="rounded-full text-white absolute main-button"
        onClick={ toggleMenu }
      >
        { isOpen ? "x" : "+"}
      </button>

      { /* Child Buttons */ }
      { isOpen && 
        <div className="relative hover-buttons">
          { reversedButtonOptions.map((currentButton, index) => {
            const { x, y } = buttons[index];

            return currentButton.link ? (
              <LinkButton key={ index } link={ currentButton.link } name={ currentButton.name } x={ x } y={ y } />
            ) : (
              <ActionButton key={ index } name={ currentButton.name } buttonAction={ currentButton.buttonAction } x={ x } y={ y } />
            );
          })}
        </div>
      }
    </div>
  )
};


// Link Button Component
function LinkButton({ link, name, x, y}) {
  
  console.log("render hoverButtons")

  return( 
    <Link
      to={link}
      className="absolute rounded-full child-button"
      style={{ transform: `translate(${ x }px, ${ -y }px)` }}
    >
      {name}
    </Link>
  )
};


// Action Button Component
function ActionButton({ name, buttonAction = () => {}, x, y }) {
  
  console.log("render hoverButtons")
  
  return (
    <button
      className="absolute rounded-full child-button"
      style={{ transform: `translate(${ x }px, ${ -y }px)` }}
      onClick={ buttonAction }
    >
      {name}
    </button>
  )
};