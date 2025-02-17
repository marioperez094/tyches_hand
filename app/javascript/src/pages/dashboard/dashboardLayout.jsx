//External Imports
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

//Components
import MenuHeaders from "@components/headers/menuHeaders/menuHeaders";
import { LinkButton, StandardButton } from "@components/menuComponents/buttons/buttons";
import HoverButtons from "@components/menuComponents/hoverButtons/hoverButtons";

export default function DashboardLayout({ links, logOut, children }) {
  const currentLocation = useLocation().pathname; //Retrieves current dashboard location
    
  //Retrieves the name of the of the current link for the header
  const title = useMemo(() => links[currentLocation]?.name || "Player Dashboard", [currentLocation]);

  //Dynamic buttons based on the current location
  const buttons = useMemo(() => {
    const filteredButtons =  Object.entries(links)
      .filter(([path]) => path !== currentLocation)
      .map(([path, values]) => ({
        name: values.name,
        link: path
      }));

      //Play and logout buttons are static but dashboard link buttons are dynamically loaded
      return ([
        { name: "Play" },
        ...filteredButtons,
        { name: "Log Out", buttonAction: logOut }
      ])

  }, [currentLocation, links, logOut]);
  
  console.log("render dashboardLayout")

  return (
    <>
      { /* Mobile navigation */ }
      <div className="md:hidden">
        <HoverButtons buttonOptions={ buttons } />
      </div>

      { /* Large screen navigation */}
      <div className="mx-5 mt-5 flex justify-between items-end">
        <MenuHeaders>
          { title }
        </MenuHeaders>
        
        <div className="hidden md:inline header-buttons">
          <LinkButtons buttonOptions={ buttons } />
        </div>
      </div>
      
      { /* Content */ }
      <main className="h-full mx-3 mb-5 overflow-y-scroll overflow-x-hidden player-info border-4 textured-gray-border">
        { children }
      </main>
    </>
  )
};

export function LinkButtons({ buttonOptions }) { 
  return(
    <>
      { buttonOptions.map((button, index) => 
        button.link ? (
          <LinkButton key={ index } link={ button.link }>{ button.name }</LinkButton>
        ) : (
          <StandardButton key={ index } buttonAction={ button.buttonAction }>{ button.name }</StandardButton>
        )
      )}
    </>
  )
};