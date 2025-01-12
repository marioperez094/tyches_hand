json.players do
  json.array! @players do |player|
    json.partial! 'api/players/player', player: player
  end
end