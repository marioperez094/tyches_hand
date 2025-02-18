//External Imports
import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";

//Stylesheets
import "./hoverButtons.scss";

export default function HoverButtons({ buttonOptions, arcAngle = 90, radius = 150 }) {
  const [isOpen, setIsOpen] = useState(false);
  const hoverRef = useRef(null);

  const numButtons = buttonOptions.length;

  function toggleMenu() {
    setIsOpen(prevState => !prevState);
  };

  function handleBlur(e) {
    //Only closes if user clicks anywhere outside the hover buttons
    if (!hoverRef.current.contains(e.relatedTarget)) return setIsOpen(false);
  }
  
  const buttons = useMemo(() =>  
    //Creates set number of arrays based on button options
    Array.from({ length: numButtons }, (_, index) => {

      //Calculates angle based on presets 
      const angle = (index / (numButtons - 1)) * arcAngle;
      const angleInRadians = (angle * Math.PI) / 180;
      return {
        //Converts angle into x and y coordinates
        x: Math.cos(angleInRadians) * radius,
        y: Math.sin(angleInRadians) * radius
      };
    }),
    [numButtons, arcAngle, radius]
  );

  //Reverse button options since first button appears in bottom right.
  const reversedButtonOptions = useMemo(() => [...buttonOptions].reverse(), [buttonOptions]);

  console.log("render hoverButtons")

  return(
    <div 
      ref={ hoverRef }
      className="fixed hover-buttons-container"
      tabIndex={ 0 }
      onBlur={ handleBlur }
    >
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