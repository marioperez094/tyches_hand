//External Imports
import React, { useState } from "react";

//Components
import InputField from "@components/menuComponents/inputField/inputField";
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";

//Context
import { usePlayer } from "@context/player";

//Functions
import { putRequest } from "@utils/fetchRequest";

export default function DeckNamer({ deck }) {
  const{ name } = deck;
  const { player, setPlayer } = usePlayer();

  const [isEditing, setIsEditing] = useState(false);
  const [deckName, setDeckName] = useState(name);

  function toggleEditMode() {
    setIsEditing(prevState => !prevState);
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
    
    putRequest(`/api/decks/rename`, payload)
      .then(data => {
        if (data.deck.name === deckName) {
          setPlayer({
            ...player,
            deck: data.deck
          });
          
          toggleEditMode();
        }
      })
      .catch(error => console.log(error))
  };

  return(
    <>
      { isEditing
        ? <EditDeckName deckName={ deckName } handleInputChange={ handleInputChange } submitDeckName={ submitDeckName }/>
        : <DeckName name={ name } toggleEditMode={ toggleEditMode }/>
      }
    </>
  )
};

//Displyas deck name with edit toggler
function DeckName({ name, toggleEditMode }) {
  return (
    <PlayerStatTitle isHeading>
      {name}
      <ActionButton onClick={toggleEditMode}>Edit</ActionButton>
    </PlayerStatTitle>
  )
};

//Rename deck form
function EditDeckName({ deckName, handleInputChange, submitDeckName }) {
  return (
    <form onSubmit={submitDeckName} className="flex justify-center">
      <div className="w-1/2">
        <InputField
          name="deck_name"
          type="text"
          value={deckName}
          changeEvent={handleInputChange}
        />
      </div>
      <ActionButton type="submit">Save</ActionButton>
    </form>
  )
};

function ActionButton({ children, onClick, type = "button" }) {
  return (
    <button 
      type={type}
      className="px-5 ml-5 rounded-lg bg-red-800 hover:bg-red-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
}