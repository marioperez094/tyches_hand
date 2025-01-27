json.name            deck.name
json.total           deck.player.cards.count
json.standard        deck.player.cards.by_effect_type("Standard").count
json.exhumed         deck.player.cards.by_effect_type("Exhumed").count
json.charred         deck.player.cards.by_effect_type("Charred").count
json.fleshwoven      deck.player.cards.by_effect_type("Fleshwoven").count
json.blessed         deck.player.cards.by_effect_type("Blessed").count
json.bloodstained    deck.player.cards.by_effect_type("Bloodstained").count