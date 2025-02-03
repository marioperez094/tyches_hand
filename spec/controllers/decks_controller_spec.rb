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

  
  let(:player) { FactoryBot.create(:player) }
  let(:deck) { player.deck }


  before do
    session[:player_id] = player.id # Simulate authentication
    controller.instance_variable_set(:@player, player) # Ensure @player is set
  end

  describe "POST #create" do
    it "returns an error if deck creation fails" do
      allow_any_instance_of(Deck).to receive(:save).and_return(false)
      post :create, params: { deck: { name: nil } }, format: :json
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe "PATCH #rename_deck" do
    it "renames the deck successfully" do
      deck.reload

      patch :rename_deck, params: { deck: { name: "Renamed Deck" } }, format: :json
      expect(response).to have_http_status(:ok)

      expect(deck.name).to eq("Renamed Deck")
    end

    it "returns an error if no player is found" do
      controller.instance_variable_set(:@player, nil)
      patch :rename_deck, params: { deck: { name: "New Name" } }, format: :json
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "PATCH #update_cards_in_deck" do
    it "updates cards successfully when exactly 52 cards are provided" do
      new_cards = Card.by_effect("Exhumed")

      player.cards << new_cards

      patch :update_cards_in_deck, params: { deck: { cards: new_cards.map { |c| { id: c.id } } } }, format: :json
      expect(response).to have_http_status(:ok)
      expect(deck.cards.count).to eq(52)
    end

    it "returns an error when fewer than 52 cards are provided" do
      new_cards = Card.by_effect("Exhumed")

      patch :update_cards_in_deck, params: { deck: { cards: new_cards.take(50).map { |c| { id: c.id } } } }, format: :json
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)["error"]).to eq("A deck must contain exactly 52 cards.")
    end

    it "returns an error if a player does not own some of the cards" do
      new_cards = Card.by_effect("Exhumed")
      
      allow(player).to receive(:owns_card?).and_return(false)
      patch :update_cards_in_deck, params: { deck: { cards: new_cards.map { |c| { id: c.id } } } }, format: :json
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
