json.player do
  json.partial! 'api/players/player', player: @player

  if @include_cards
    json.cards do
      json.array! @player.cards do |card|
        json.partial! 'api/cards/card', card: card
      end
    end
  end
end