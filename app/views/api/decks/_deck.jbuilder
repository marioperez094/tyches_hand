json.name            deck.name
json.Total           deck.player.cards.count

Card::EFFECTS.each do |effect|
  json.set! effect, deck.player.cards.by_effect(effect).count
end