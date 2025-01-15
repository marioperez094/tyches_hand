json.player do
  json.partial! 'api/players/player', player: @player

  if @include_decks 
    json.deck do
      json.partial! 'api/decks/deck', deck: @player.deck
    end
  end

  if @include_cards
    json.cards do
      json.array! @player.cards do |card|
        json.partial! 'api/cards/card', card: card
      end
    end
  end

  if @separate_deck_cards
    json.non_deck_cards do
      json.array! @player.cards.where.not(id: @player.deck.cards.select(:id)) do |card|
        json.partial! 'api/cards/card', card: card
      end
    end

    json.deck_cards do
      json.array! @player.deck.cards do |card|
        json.partial! 'api/cards/card', card: card
      end
    end
  end
end