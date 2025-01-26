export const siteKey = process.env['REACT_APP_RECAPTCHA_SITE_KEY'];

export const playerMaxHealth = 5000;

export const deckTypes = [{
      name: "total",
      description: "Total cards in deck and collection.",
    }, { 
      name: "standard",
      description: "A Standard Deck of Cards.", 
    }, { 
      name: "blessed",
      description: "The cards are blinding, and sizzles to the touch. MULTIPLIES WAGER.",
    }, { 
      name: "bloodstained",
      description: "The cards are matted together by blood, filling the room with their foul odor. DAIMON'S MINIMUM WAGER INCREASES."
    }, { 
      name: "charred",
      description: "The embers on these cards can still cauterize wounds. REDUCES BLOOD LOSS.",
    }, { 
      name: "exhumed",
      description: "Cards ripped from a corpse's stiff grip. GREATER BLOOD POOL WINNINGS WITH WINNING HAND."
    }, { 
      name: "fleshwoven",
      description: "These cards appear to have a leathery texture and an odd familiarity. GREATER BLOOD POOL WINNINGS IF THE HAND ENDS IN A PUSH."
    }];