json.player do
  json.partial! 'api/players/player', player: @player

  if @include_deck_stats 
    json.deck do
      json.partial! 'api/players/card_stats', player: @player
    end
  end

  if @include_deck_cards
    json.deck_cards do
      json.array! @player.equipped_cards do |card|
        json.partial! 'api/cards/card', card: card
      end
    end
  end

  if @include_collection_cards
    json.collection_cards do
      json.array! @player.cards.where.not(id: @player.equipped_cards.select(:id)) do |card|
        json.partial! 'api/cards/card', card: card
      end
    end
  end

  if @include_collection_tokens
    json.collection_tokens do
      json.array! @player.tokens do |token|
        json.partial! 'api/tokens/token', token: token
      end
    end
  end
end