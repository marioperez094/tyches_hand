require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do  
  render_views

  let(:player) { FactoryBot.create(:player) }
  let(:card) { FactoryBot.create(:card) }

  before do
    session[:player_id] = player.id # Simulate authentication
    controller.instance_variable_set(:@player, player) # Ensure @player is set
  end

  describe "GET #show" do
    context "when the card exists and the player owns it" do
      before do
        player.cards << card # Player owns this card
        get :show, params: { id: card.id }
      end

      it "returns a 200 OK status" do
        expect(response).to have_http_status(:ok)
      end

      it "returns the card data" do
        expect(response.body).to include(card.name)
      end
    end

    context "when the card does not exist" do
      before { get :show, params: { id: 9999 } } # Non-existent card ID

      it "returns a 404 Not Found status" do
        expect(response).to have_http_status(:not_found)
      end

      it "returns an error message" do
        expect(response.body).to include("Card not found.")
      end
    end

    context "when the player does not own the card" do
      before { get :show, params: { id: card.id } } # Player does not own this card

      it "returns a 401 Unauthorized status" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns an error message" do
        expect(response.body).to include("Player does not have this card.")
      end
    end
  end
end
