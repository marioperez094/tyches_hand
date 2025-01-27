//External Imports
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import CardStack from "@components/gameAssets/cards/cardStack";
import PlayerStatsLayout from "./playerStatsLayout";
import DeckNamer from "./deckNamer";
import Card from "@components/gameAssets/cards/card";
import HoverText from "@components/headers/hoverText/hoverText";
import { HomeButton } from "@components/menuComponents/buttons/homeButton/homeButton";

//Functions
import { putRequest } from "@utils/fetchRequest";

export default function DeckEditor({ player }) {
  if (!player.deck) return;
  const { deck, deck_cards, non_deck_cards } = player;
  const [deckCards, setDeckCards] = useState(deck_cards);
  const [collectedCards, setCollectedCards] = useState(non_deck_cards);
  const [draggingCard, setDraggingCard] = useState(null);
  const [cardSource, setCardSource] = useState("");

  function updateDeckCards(cards) {
    setDeckCards(cards);
  };

  function updateCollectedCards(cards) {
    setCollectedCards(cards);
  };

  function handleDragStart(e, card, cardSource) {
    setDraggingCard(card);
    setCardSource(cardSource);
      
    const dragPreviewContainer = document.createElement("div");
    dragPreviewContainer.style.position = "absolute";
    dragPreviewContainer.style.top = "-9999px";
    dragPreviewContainer.style.left = "-9999px";
  
    document.body.appendChild(dragPreviewContainer);
  
    const root = ReactDOM.createRoot(dragPreviewContainer);
    root.render(<Card card={ card } />);
  
    e.dataTransfer.setDragImage(dragPreviewContainer, 75, 100);
  
    setTimeout(() => {
      root.unmount();
      document.body.removeChild(dragPreviewContainer);
    }, 0);
  };

  function handleCardDrop(e, targetStack) {
    e.preventDefault();
    if (!draggingCard || cardSource === targetStack) return setDraggingCard(null);
    
    const targetStackBoolean = targetStack === "Collection Cards"

    updateDeckCards((prevDeckCards) => {
      if (targetStackBoolean) return prevDeckCards.filter(card => card.id !== draggingCard.id)
      return [draggingCard, ...prevDeckCards]
    });

    updateCollectedCards((prevDeckCards) => {
      if (targetStackBoolean) return [...prevDeckCards, draggingCard]
      return prevDeckCards.filter(card => card.id !== draggingCard.id)
      
    });

    setDraggingCard(null);
  };

  function submitDeck(e) {
    e.preventDefault();
    if (JSON.stringify(deckCards) === JSON.stringify(deck_cards)) return console.log("Nothing Happend")
    const payload = {
      deck: {
        cards: deckCards
      }  
    };

    putRequest(`/api/decks/update/cards`, payload)
      .then(data => console.log(data))
      .catch(error => console.log(error))

  };

  return( 
    <PlayerStatsLayout title="Edit Deck">
      <div>
          <HomeButton
            buttonAction={ submitDeck }
          >Save Deck</HomeButton>
        </div>
      <article className="mx-auto my-3 sm:my-5 lg:my-10">
        <DeckNamer deck={ deck } />
        <div 
          className="w-full card-drop"
          onDragOver={ (e) => e.preventDefault() }
          onDrop={ (e) => handleCardDrop(e, "Collection Cards") }
        >
          <PlayerStatTitle>Cards Collected: { collectedCards.length }</PlayerStatTitle> 
            <CardStack
              name="Card Collection"  
              cards={ collectedCards }
              dragStart={ (e, card) => handleDragStart(e, card, "Collection Cards") }
            />
          </div>
          <div 
            className="w-full card-drop"
            onDragOver={ (e) => e.preventDefault() }
            onDrop={ (e) => handleCardDrop(e, "Deck Cards") }
          >
            <PlayerStatTitle>Cards in Deck: { deckCards.length }/52 
              <HoverText
                name="52 Cards"
                description="The hand of Tyche demands balance. Your deck must consist 
                  of precisely 52 cards - no more, no less. To defy this rule is to defy Tyche
                  and such insulence would lead to unimaginable consequences."
              >
                <div
                  className="border w-7 h-7 rounded-full inline-block"
                >
                  i
                </div>
              </HoverText>
            </PlayerStatTitle> 
            <CardStack  
              cards={ deckCards }
              dragStart={ (e, card) => handleDragStart(e, card, "Deck Cards") }
            />
          </div>
      </article>
    </PlayerStatsLayout>
  )
};
