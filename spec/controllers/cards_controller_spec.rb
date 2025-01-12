require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  render_views

  context 'GET /cards' do
    it 'searches for a card' do
      card1 = FactoryBot.create(:card)
      card2 = FactoryBot.create(:card, value: 3)

      get :show, params: { id: card2.id }

      expect(response.body).to eq({
        card: {
          id: card2.id,
          name: card2.name,
          suit: card2.suit,
          value: card2.value,
          description: card2.description,
          effect_type: card2.effect_type,
          effect: card2.effect
        }
      }.to_json)
    end
  end
  
end