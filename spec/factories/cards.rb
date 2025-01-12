FactoryBot.define do
  factory :card do
    name { "#{effect_type} #{value} of #{suit}" }
    suit { 'Hearts' }
    value { '7' }
    description { 'Playing this card 2x your blood wager.' }
    effect_type { 'Blood Stained' }
    effect { '2' }
  end
end