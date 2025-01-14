FactoryBot.define do
  factory :card do
    suit { 'Hearts' }
    rank { '7' }
    effect_type { 'Bloodstained' }
  end
end