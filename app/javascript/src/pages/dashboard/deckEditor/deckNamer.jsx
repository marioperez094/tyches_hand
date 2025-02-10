//External Imports
import React, { useState } from "react";

//Context
import { usePlayer } from "@context/player";

//Components
import SubHeaders from "@components/headers/subHeaders/subHeaders";
import InputField from "@components/menuComponents/inputFields/inputFields";

//Functions
import { putRequest } from "@utils/fetchRequest";

export default function DeckNamer({ name }) {
  const { setPlayer } = usePlayer();
  const [isEditing, setIsEditing] = useState(false);
  const [deckName, setDeckName] = useState(name);

  function toggleEditMode() {
    setIsEditing(prev => !prev);
  };

  function handleInputChange(e) {
    setDeckName(e.target.value)
  };

  function submitDeckName(e) {
    if (e) e.preventDefault();
    if (deckName.trim() === name) return toggleEditMode(); //Prevents unnecessary API calls

    const payload = {
      name: deckName
    };
    
    putRequest("/api/decks/rename", payload)
      .then(data => {
        if (data.success) {
          setPlayer((prev) => ({
            ...prev,
            deck: { ...prev.deck, name: deckName }
          }));

          toggleEditMode();
        }
      })
      .catch(error => console.log(error))
  };

  return (
    <>
      { isEditing ? (
        <EditDeckName deckName={ deckName } handleInputChange={ handleInputChange } submitDeckName={ submitDeckName } />
      ) : (
        <DeckName name={ name } toggleEditMode={ toggleEditMode } />
      )}
    </>
  )
};

//Displays deck name with toggle
function DeckName({ name, toggleEditMode }) {
  return (
    <SubHeaders isHeading>
      { name }
      <ActionButton onClick={toggleEditMode}>Edit</ActionButton>
    </SubHeaders>
  )
};

//Rename deck form
function EditDeckName({ deckName, handleInputChange, submitDeckName }) {
  return (
    <form onSubmit={ submitDeckName } className="flex justify-center">
      <div className="w-1/2">
        <InputField
          name="deck_name"
          type="text"
          value={ deckName }
          changeEvent={ handleInputChange }
        />
      </div>
      <ActionButton type="submit">Save</ActionButton>
    </form>
  )
};


function ActionButton({ children, onClick, type = "button" }) {
  return (
    <button 
      type={ type }
      className="px-5 ml-5 rounded-lg bg-red-800 hover:bg-red-500"
      onClick={ onClick }
    >
      {children}
    </button>
  )
};