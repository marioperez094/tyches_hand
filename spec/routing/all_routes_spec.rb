require 'rails_helper'

RSpec.describe "API Routing", type: :routing do
  describe "Players routes" do
    it "routes /api/players to players#create" do
      expect(post: "/api/players").to route_to("api/players#create")
    end

    it "routes /api/players to players#index" do
      expect(get: "/api/players").to route_to("api/players#index")
    end

    it "routes /api/players/show to players#show" do
      expect(get: "/api/players/show").to route_to("api/players#show")
    end

    it "routes /api/players/convert_to_registered to players#convert_to_registered" do
      expect(put: "/api/players/convert_to_registered").to route_to("api/players#convert_to_registered")
    end

    it "routes /api/players/update_password to players#update_password" do
      expect(put: "/api/players/update_password").to route_to("api/players#update_password")
    end

    it "routes /api/players/cards/discover to players#player_discover_cards" do
      expect(post: "/api/players/cards/discover").to route_to("api/players#player_discover_cards")
    end

    it "routes /api/players to players#destroy" do
      expect(delete: "/api/players/1").to route_to("api/players#destroy", id: "1")
    end
  end

  describe "Sessions routes" do
    it "routes /api/sessions to sessions#create" do
      expect(post: "/api/sessions").to route_to("api/sessions#create")
    end

    it "routes /api/authenticated to sessions#authenticated" do
      expect(get: "/api/authenticated").to route_to("api/sessions#authenticated")
    end

    it "routes /api/sessions to sessions#destroy" do
      expect(delete: "/api/sessions").to route_to("api/sessions#destroy")
    end
  end

  describe "Cards routes" do
    it "routes /api/cards/:id to cards#show" do
      expect(get: "/api/cards/1").to route_to("api/cards#show", id: "1")
    end
  end

  describe "Decks routes" do
    it "routes /api/decks to decks#create" do
      expect(post: "/api/decks").to route_to("api/decks#create")
    end

    it "routes /api/decks/rename to decks#rename_deck" do
      expect(put: "/api/decks/rename").to route_to("api/decks#rename_deck")
    end

    it "routes /api/decks/update/cards to decks#update_cards_in_deck" do
      expect(put: "/api/decks/update/cards").to route_to("api/decks#update_cards_in_deck")
    end
  end
end
