//External Imports
import React from "react";

//Functions
import { capitalizeFirstWord } from "@utils/utils";

export default function UserOptions({ options, setCurrentWidgetState }) {
  return(
    <div className="w-full px-10 text-center text-red-500 mt-5">
      { options.map((option, index) => {
        return (
          <>
            { index > 0 && <span className="mx-3"> | </span>}
            <a className="cursor-pointer" onClick={ () => setCurrentWidgetState(option) }>{ capitalizeFirstWord(option) }</a>
          </>
        )
      })}
    </div>
  )
};