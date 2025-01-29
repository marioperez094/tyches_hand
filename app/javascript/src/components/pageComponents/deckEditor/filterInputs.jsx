//External Imports
import React from "react";

//Functions
import { capitalizeFirstWord } from "@utils/utils";

export default function FilterInputs({ filters, deck, filterCards }) {
  return (
    <div className="flex justify-between overflow-x-scroll filter-container">
      { Object.keys(filters).map((filter) => {
        if (!filters[filter] && deck[filter] === 0) return null;

        return (
          <label 
            htmlFor={ filter }
            className="relative block mx-5 filter-checkbox-container"
          >
            { capitalizeFirstWord(filter) }
            <input
              type="checkbox"
              id={ filter }
              name={ filter }
              className="absolute filter-checkboxes"
              checked={ filters[filter] }
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