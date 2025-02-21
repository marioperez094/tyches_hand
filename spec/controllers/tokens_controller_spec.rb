require 'rails_helper'

RSpec.describe Api::TokensController, type: :controller do  
  render_views

  let(:player) { FactoryBot.create(:player) }
  let(:token) { FactoryBot.create(:token) }

  before do
    session[:player_id] = player.id # Simulate authentication
    controller.instance_variable_set(:@player, player) # Ensure @player is set
  end

  describe "GET #show" do
    context "when the token exists and the player owns it" do
      before do
        player.tokens << token # Player owns this token
        get :show, params: { id: token.id }
      end

      it "returns a 200 OK status" do
        expect(response).to have_http_status(:ok)
      end

      it "returns the token data" do
        expect(response.body).to include(token.name)
      end
    end

    context "when the token does not exist" do
      before { get :show, params: { id: 9999 } } # Non-existent token ID

      it "returns a 404 Not Found status" do
        expect(response).to have_http_status(:not_found)
      end

      it "returns an error message" do
        expect(response.body).to include("Token not found.")
      end
    end

    context "when the player does not own the token" do
      before { get :show, params: { id: token.id } } # Player does not own this token

      it "returns a 401 Unauthorized status" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns an error message" do
        expect(response.body).to include("Player does not have this token.")
      end
    end
  end
end
