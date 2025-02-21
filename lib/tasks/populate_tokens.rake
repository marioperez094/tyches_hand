#heroku run rake tokens:populate_tokens
namespace :tokens do
  desc "Populate tokens"
  task populate_tokens: :environment do
    tokens = [{
      name: 'Eye of Tyche',
      symbol: 'Ω',
      description: 'Tyche has taken mercy, granting you the ability to see what others cannot.',
      effect_type: 'Visual',
      lore_token: true,
      sequence_order: 0,
      inscribed_effect: 'Unveil the card count, letting you track the balance of high and low cards.',
      oathbound_effect: 'Glimpse ahead—know whether the next card will raise or lower the count.',
      offering_effect: 'See beyond fate itself. The next card in the deck is revealed to you.',
    }]

    tokens.each do |token_data|
      Token.find_or_create_by!(name: token_data[:name]) do |token|
        token.symbol = token_data[:symbol]
        token.description = token_data[:description]
        token.effect_type = token_data[:effect_type]
        token.lore_token = token_data[:lore_token]
        token.sequence_order = token_data[:sequence_order]
        token.inscribed_effect = token_data[:inscribed_effect]
        token.oathbound_effect = token_data[:oathbound_effect]
        token.offering_effect = token_data[:offering_effect]
      end
    end

    puts "Tokens populated successfully "
  end
end