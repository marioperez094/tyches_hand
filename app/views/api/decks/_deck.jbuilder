json.name            deck.name
json.total           deck.cards.count
json.standard        deck.cards.by_effect_type("Standard").count
json.exhumed         deck.cards.by_effect_type("Exhumed").count
json.charred         deck.cards.by_effect_type("Charred").count
json.fleshwoven      deck.cards.by_effect_type("Fleshwoven").count
json.blessed         deck.cards.by_effect_type("Blessed").count
json.bloodstained    deck.cards.by_effect_type("Bloodstained").count