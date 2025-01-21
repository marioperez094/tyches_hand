require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  render_views 

  before do
    Card::EFFECTS.each do |effect_type|
      Card::SUITS.each do |suit|
        Card::RANKS.each do |rank|
          FactoryBot.create(:card, rank: rank, suit: suit, effect_type: effect_type)
        end
      end
    end
  end

  context 'POST /sessions' do
    it 'renders new session' do
      FactoryBot.create(:player)

      post :create, params: {
        player: {
          username: 'Test',
          password: '123456'
        }
      }
      
      expect(Session.count).to be(1)
      expect(response.body).to eq({
        success: true
      }.to_json)
    end
  end

  context 'DELETE /sessions' do
    it 'renders success' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      delete :destroy

      expect(player.sessions.count).to be(0)
      expect(Player.count).to be(1)
      expect(response.body).to eq({
        success: true
      }.to_json)
    end
  end

  context 'DELETE /sessions and deletes player if guest player' do
    it 'renders success' do
      player = FactoryBot.create(:player, username: nil, password: nil, guest: true)
      deck = FactoryBot.create(:deck, player: player)
      player.discover_cards
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      delete :destroy

      expect(player.sessions.count).to be(0)
      expect(Player.count).to be(0)
      expect(response.body).to eq({
        success: true
      }.to_json)
    end
  end

  context 'GET /authenticated' do
    it 'authenticates the player' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      get :authenticated

      expect(response.body).to eq({
        authenticated: true
      }.to_json)
    end
  end

end