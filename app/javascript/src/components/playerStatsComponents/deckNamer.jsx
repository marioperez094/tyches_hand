//External Imports
import React, { useState } from "react";

//Components
import InputField from "@components/inputField/inputField";
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";

//Context
import { usePlayer } from "@context/player";

//Functions
import { putRequest } from "@utils/fetchRequest";

export default function DeckNamer({ deck }) {
  const{ id, name } = deck;
  const { player, setPlayer } = usePlayer();
  const [editName, setEditName] = useState(true);
  const [deckName, setDeckName] = useState(name);

  function editNameBoolean() {
    setEditName(prevState => !prevState)
  };

  function handleFormData(e) {
    if (e) e.preventDefault();
    setDeckName(e.target.value)
  };

  function submitDeckName(e) {
    if (e) e.preventDefault();
    const payload = {
      name: deckName
    };
    
    putRequest(`/api/decks/${ id }/rename`, payload)
      .then(data => {
        if (data.deck.name === deckName) {
          setPlayer({
            ...player,
            deck: data.deck
          });
          
          editNameBoolean();
        }
      })
      .catch(error => console.log(error))
  };

  return(
    <>
      { editName
        ? <DeckName name={ name } buttonAction={ editNameBoolean }/>
        : <EditDeckName deckName={ deckName } handleFormData={ handleFormData } submitDeckName={ submitDeckName }/>
      }
    </>
  )
};

function DeckName({ name, buttonAction }) {
  return (
    <PlayerStatTitle
      isHeading={ true }
    >
      { name }
      <div className="w-1/8 inline-block ml-5">
        <button className="px-5 rounded-lg bg-red-800 hover:bg-red-500" onClick={ buttonAction }>Edit</button>
      </div>
    </PlayerStatTitle>
  )
};

function EditDeckName({ deckName, handleFormData, submitDeckName }) {
  return (
    <form 
      onSubmit={ submitDeckName }
      className="flex justify-center"
    >
      <div className="w-1/2">
        <InputField
          name="deck_name"
          type="text" 
          value={ deckName }
          changeEvent={ handleFormData }
        />
      </div>
      <button 
        type="submit"
        className="px-5 ml-5 rounded-lg bg-red-800 hover:bg-red-500"
      >
        Save
      </button>
    </form>
  )
};