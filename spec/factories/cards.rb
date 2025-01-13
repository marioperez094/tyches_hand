FactoryBot.define do
  factory :card do
    suit { 'Hearts' }
    value { '7' }
    effect_type { 'Bloodstained' }
    effect { '2' }
  end
end