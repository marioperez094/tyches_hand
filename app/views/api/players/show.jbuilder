json.player do
  json.partial! 'api/players/player', player: @player

  if @include_card_stats 
    json.deck do
      json.partial! 'api/players/card_stats', deck: @player.deck
    end
  end

  if @include_deck_cards
    json.deck_cards do
      json.array! @player.deck.cards do |card|
        json.partial! 'api/cards/card', card: card
      end
    end
  end

  if @include_collected_cards
    json.collection_cards do
      json.array! @player.cards.where.not(id: @player.deck.cards.select(:id)) do |card|
        json.partial! 'api/cards/card', card: card
      end
    end
  end
end