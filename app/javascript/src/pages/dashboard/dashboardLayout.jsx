//External Imports
import React from "react";

//Components
import MenuHeaders from "@components/headers/menuHeaders/menuHeaders";
import { LinkButton, StandardButton } from "@components/menuComponents/buttons/buttons";

export default function DashboardLayout({ title, buttons, children }) {
  return (
    <>
      { /* Mobile navigation */ }

      { /* Large screen navigation */}
      <div className="mx-5 mt-5 flex justify-between items-end">
        <MenuHeaders>
          { title }
        </MenuHeaders>
        
        <div className="md:inline header-buttons">
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