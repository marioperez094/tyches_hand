require 'rails_helper'

RSpec.describe Api::DecksController, type: :controller do
  render_views

  before do
    Card::EFFECTS.each do |effect|
      Card::SUITS.each do |suit|
        Card::RANKS.each do |rank|
          FactoryBot.create(:card, rank: rank, suit: suit, effect: effect)
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
          Total: 52,
          Standard: 52,
          Exhumed: 0,
          Charred: 0,
          Fleshwoven: 0,
          Blessed: 0,
          Bloodstained: 0,
        }
      }.to_json)
    end
  end

  context 'PUT /deck' do
    it 'renames the player deck' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      deck = FactoryBot.create(:deck, player: player)

      
      card = Card.first

      player.cards << card
      deck.cards << card

      put :rename_deck, params: {
        deck: {
          name: 'Test'
        }
      }

      expect(response.body).to eq({
        deck: {
          name: "Test",
          Total: 53,
          Standard: 52,
          Exhumed: 1,
          Charred: 0,
          Fleshwoven: 0,
          Blessed: 0,
          Bloodstained: 0,
        }
      }.to_json)
    end

    it 'updates cards in a deck' do
      player = FactoryBot.create(:player)
      session = player.sessions.create
      @request.cookie_jar.signed['tyches_hand_session_token'] = session.token

      deck = FactoryBot.create(:deck, player: player)
      cards = deck.cards.map { |card| { id: card.id }  }

      card1 = Card.first
      card2 = Card.second

      player.cards << card1

      put :update_cards_in_deck, params: { 
        deck: {
          cards: cards
        }
      }

      expect(response.body).to eq({
        deck: {
          name: "Test's Deck",
          Total: 53,
          Standard: 52,
          Exhumed: 1,
          Charred: 0,
          Fleshwoven: 0,
          Blessed: 0,
          Bloodstained: 0,
        }
      }.to_json)
    end
  end
end