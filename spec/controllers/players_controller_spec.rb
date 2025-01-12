require 'rails_helper'

RSpec.describe Api::PlayersController, type: :controller do
  render_views

  context 'POST /players' do
    it 'renders a new registered player' do
      post :create, params: {
        player: {
          username: 'Test',
          password: '123456',
        }
      }

      expect(response.body).to eq({
        player: {
          username: 'Test',
          guest: false,
          blood_pool: 5000,
        }
      }.to_json)
    end

    it 'renders a new guest player' do
      post :create, params: {
        player: {
          guest: true,
        }
      }

      expect(response.body). to eq({
        player: {
          username: "Guest#{Time.now.to_i}",
          guest: true,
          blood_pool: 5000,
        }
      }.to_json)
    end
  end

  context 'GET /players' do
    it 'indexes all players' do
      player1 = FactoryBot.create(:player)
      player2 = FactoryBot.create(:player, username: nil, password: nil, guest: true)

      get :index

      expect(response.body).to eq({
        players: [{
          username: player2.username,
          guest: player2.guest,
          blood_pool: player2.blood_pool,

        }, {
          username: player1.username,
          guest: player1.guest,
          blood_pool: player1.blood_pool,
        }]
      }.to_json)
    end

    it 'shows a player' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      get :show, params: { id: player.id }

      expect(response.body).to eq({
        player: {
          username: player.username,
          guest: player.guest,
          blood_pool: player.blood_pool
        }
      }.to_json)
    end
  end

  context 'PUT /player/:id' do
    it 'converts guest player to registered player' do
      player = FactoryBot.create(:player, username: nil, password: nil, guest: true)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      post :convert_to_registered, params: { id: player.id,
        player: {
          username: 'Test',
          password: '123456',
        }
      }

      expect(response.body).to eq({
        player: {
          username: 'Test',
          guest: false,
          blood_pool: player.blood_pool
        }
      }.to_json)
    end

    it 'does not convert a registered account' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      post :convert_to_registered, params: { id: player.id,
        player: {
          username: 'Test',
          password: '123456',
        }
      }

      expect(response.body).to eq({
        error: 'This account is already registered.'
      }.to_json)
    end

    it 'updates a player password' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      post :update_password, params: { id: player.id,
        player: {
          password: 'abcdef'
        }
      }

      expect(response.body).to eq({
        success: true
      }.to_json)
    end
  end

  context 'DELETE /player/:id' do
    it 'deletes a player' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      delete :destroy, params: { id: player.id }

      expect(Player.count).to eq(0)
    end
  end
end
