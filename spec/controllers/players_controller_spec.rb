require 'rails_helper'

RSpec.describe Api::PlayersController, type: :controller do
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
          tutorial_complete: false,
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
          tutorial_complete: false
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
          tutorial_complete: false

        }, {
          username: player1.username,
          guest: player1.guest,
          blood_pool: player1.blood_pool,
          tutorial_complete: false
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
          blood_pool: player.blood_pool, 
          tutorial_complete: false
        }
      }.to_json)
    end

    it 'shows a player and their cards' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      card1 = Card.first
      card2 = Card.last

      player.cards << card1
      player.cards << card2

      get :show, params: { id: player.id, cards: 'true'}

      expect(response.body).to eq({
        player: {
          username: player.username,
          guest: player.guest,
          blood_pool: player.blood_pool,
          tutorial_complete: false,

          cards: [{
            id: card1.id,
            name: card1.name,
            suit: card1.suit,
            rank: card1.rank,
            description: card1.description,
            effect_type: card1.effect_type,
            effect_value: card1.calculate_effect_value
          }, {
            id: card2.id,
            name: card2.name,
            suit: card2.suit,
            rank: card2.rank,
            description: card2.description,
            effect_type: card2.effect_type,
            effect_value: card2.calculate_effect_value
          }]
        }
      }.to_json)
    end

    it 'shows a player and their deck' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      deck = FactoryBot.create(:deck, player: player)

      get :show, params: { id: player.id, deck: 'true'}

      expect(response.body).to eq({
        player: {
          username: player.username,
          guest: player.guest,
          blood_pool: player.blood_pool,
          tutorial_complete: false, 

          deck: {
            name: "#{player.username}'s Deck",
            total: 52,
            standard: 52,
            exhumed: 0,
            charred: 0,
            fleshwoven: 0,
            blessed: 0,
            bloodstained: 0,
          }
        }
      }.to_json)
    end

    it 'shows a player and sepeartes their deck and non-deck cards' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      deck = FactoryBot.create(:deck, player: player)
      player.discover_cards

      get :show, params: { id: player.id, deck_cards: 'true'}

      expect(response.body).to eq({
        player: {
          username: player.username,
          guest: player.guest,
          blood_pool: player.blood_pool,
          tutorial_complete: false,

          deck: {
            name: "#{player.username}'s Deck",
            total: 52,
            standard: 52,
            exhumed: 0,
            charred: 0,
            fleshwoven: 0,
            blessed: 0,
            bloodstained: 0,
          }
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
          blood_pool: player.blood_pool, 
          tutorial_complete: false
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

      put :update_password, params: {
        player: {
          password: '123456',
          new_password: 'abcdefg'
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

      delete :destroy, params: { id: player.id,
        player: {
          password: '123456'
        }
      }

      expect(Player.count).to eq(0)
    end
  end

  context 'POST /players/cards/discover' do
    it 'randomly generates max 10 cards for player to discover' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      post :player_discover_cards

      expect(player.cards.count).to be >= 0
    end
  end
end
