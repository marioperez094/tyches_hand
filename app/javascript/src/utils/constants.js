export const siteKey = process.env['REACT_APP_RECAPTCHA_SITE_KEY'];

export const playerMaxHealth = 5000;

export const deckTypes = [{
    name: "Total",
    description: "Total cards in deck and collection.",
  }, { 
    name: "Standard",
    description: "A Standard Deck of Cards.", 
  }, { 
    name: "Blessed",
    description: "The cards are blinding, and sizzles to the touch. MULTIPLIES WAGER.",
  }, { 
    name: "Bloodstained",
    description: "The cards are matted together by blood, filling the room with their foul odor. DAIMON'S MINIMUM WAGER INCREASES."
  }, { 
    name: "Charred",
    description: "The embers on these cards can still cauterize wounds. REDUCES BLOOD LOSS.",
  }, { 
    name: "Exhumed",
    description: "Cards ripped from a corpse's stiff grip. GREATER BLOOD POOL WINNINGS WITH WINNING HAND."
  }, { 
    name: "Fleshwoven",
    description: "These cards appear to have a leathery texture and an odd familiarity. GREATER BLOOD POOL WINNINGS IF THE HAND ENDS IN A PUSH."
}];