require 'rails_helper'

RSpec.describe Api::DecksController, type: :controller do
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

  context 'POST /deck' do
    it "creates a new player deck" do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      post :create, params: { player: player,
        deck: {
          name: nil
        }
      }

      expect(response.body).to eq({
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
      }.to_json)
    end
  end

  context 'PUT /deck/:id' do
    it 'renames the player deck' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      deck = FactoryBot.create(:deck, player: player)

      
      card = Card.first

      player.cards << card
      deck.cards << card

      post :rename_deck, params: { id: deck.id,
        deck: {
          name: 'Test'
        }
      }

      expect(response.body).to eq({
        deck: {
          name: "Test",
          total: 53,
          standard: 52,
          exhumed: 1,
          charred: 0,
          fleshwoven: 0,
          blessed: 0,
          bloodstained: 0,
        }
      }.to_json)
    end

    it 'swaps one card for another' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      deck = FactoryBot.create(:deck, player: player)

      card1 = Card.first
      card2 = deck.cards.first

      player.cards << card1

      put :swap_cards, params: { 
        id: deck.id,
        card_removed: card2.id,
        card_added: card1.id,
        deck: {
          name: nil
        }
      }

      expect(response.body).to eq({
        deck: {
          name: "Test's Deck",
          total: 52,
          standard: 51,
          exhumed: 1,
          charred: 0,
          fleshwoven: 0,
          blessed: 0,
          bloodstained: 0,
        }
      }.to_json)
    end
  end
end