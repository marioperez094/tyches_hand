//External Imports
import React from "react";

//Functions
import { capitalizeFirstWord } from "@utils/utils";

export default function FilterInputs({ filters, deck, filterCards }) {
  return (
    <div className="flex justify-between overflow-x-scroll filter-container">
      { Object.entries(filters).map(([filterName, value]) => {
        console.log("filter: ", filterName + " " + !value)
        if (!value && deck[filterName] === 0) return;
        console.log("filter: ", filterName + " " + !value)
        
        return (
          <label 
            key={ filterName }
            htmlFor={ filterName }
            className="relative block mx-5 filter-checkbox-container"
          >
            { capitalizeFirstWord(filterName) }
            <input
              type="checkbox"
              id={ filterName }
              name={ filterName }
              className="absolute filter-checkboxes"
              checked={ value }
              onChange={ (e) => filterCards(e) }
            />
            <span className="absolute flex justify-center items-center rounded-full filter-checkmark" />
          </label>
        );
      })}
    </div>
  );
}

/*
<div 
key={ filter } 
className="flex flex-nowrap items-center mx-3"
>
<input
  id={ filter }
  name={ filter }
  type="checkbox"
  className="filter-checkboxes"
  checked={ filters[filter] }
  onChange={ (e) => filterCards(e) }
/>
<label 
  htmlFor={ filter } 
  className="filter-label ml-2"
>
  { capitalizeFirstWord(filter) }
</label>
</div>*/