require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  render_views

  context 'GET /cards' do
    it 'searches for a card' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      card1 = FactoryBot.create(:card)
      card2 = FactoryBot.create(:card, rank: 3)

      player.cards << card2

      get :show, params: { id: card2.id }

      expect(response.body).to eq({
        card: {
          id: card2.id,
          name: card2.name,
          suit: card2.suit,
          rank: card2.rank,
          description: card2.description,
          effect: card2.effect,
          effect_value: card2.calculate_effect_value
        }
      }.to_json)
    end

    
    it 'if a card does not belong to player, invalid' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      card1 = FactoryBot.create(:card)
      card2 = FactoryBot.create(:card, rank: 3)
      
      get :show, params: { id: card2.id }

      expect(response.body).to eq({
        error: 'Player does not have this card.'
      }.to_json)
    end
  end
end