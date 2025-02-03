require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  let(:player) { FactoryBot.create(:player, password: "password123", password_confirmation: "password123") }
  let(:guest_player) { FactoryBot.create(:player, username: nil, password: nil, password_confirmation: nil, guest: true) }
  let(:session) { FactoryBot.create(:session, player: player) }

  before do
    allow_any_instance_of(ApplicationController).to receive(:current_player).and_return(player)
  end

  describe "POST #create" do
    let(:valid_params) { { player: { username: player.username, password: "password123" } } }
    let(:invalid_params) { { player: { username: player.username, password: "wrongpassword" } } }

    it "creates a session for a valid player" do
      post :create, params: valid_params, format: :json
      expect(response).to have_http_status(:ok)
      expect(response.cookies["tyches_hand_session_token"]).not_to be_nil
    end

    it "returns an error if the player does not exist" do
      post :create, params: { player: { username: "nonexistent", password: "password123" } }, format: :json
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)["error"]).to eq("Player not found.")
    end

    it "returns an error for invalid credentials" do
      post :create, params: invalid_params, format: :json
      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)["error"]).to eq("Invalid username or password.")
    end
  end

  describe "DELETE #destroy" do
    before do
      cookies.signed[:tyches_hand_session_token] = session.token
    end

    it "destroys the session and removes the session token" do
      cookies.signed[:tyches_hand_session_token] = session.token # Simulate login
  
      delete :destroy

      expect(response).to have_http_status(:ok)
      expect(Session.exists?(session.id)).to be false

      cookies.delete(:tyches_hand_session_token)

      expect(cookies.signed[:tyches_hand_session_token]).to be_nil
    end

    it "deletes a guest player along with the session" do
      guest_session = FactoryBot.create(:session, player: guest_player)
      cookies.signed[:tyches_hand_session_token] = guest_session.token

      delete :destroy, format: :json

      expect(response).to have_http_status(:ok)
      expect(Player.exists?(guest_player.id)).to be false
    end

    it "returns an error if session is not found" do
      cookies.signed[:tyches_hand_session_token] = nil
      delete :destroy, format: :json
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)["error"]).to eq("Session not found.")
    end
  end

  describe "GET #authenticated" do
    before do
      cookies.signed[:tyches_hand_session_token] = session.token
    end

    it "returns authenticated: true if session is valid" do
      get :authenticated, format: :json
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["authenticated"]).to be true
    end

    it "destroys expired sessions and returns authenticated: false" do
      allow_any_instance_of(Session).to receive(:expired?).and_return(true)

      get :authenticated, format: :json

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["authenticated"]).to be false
      expect(Session.exists?(session.id)).to be false
    end

    it "deletes guest players after checking authentication" do
      guest_session = FactoryBot.create(:session, player: guest_player)
      cookies.signed[:tyches_hand_session_token] = guest_session.token

      get :authenticated, format: :json

      expect(response).to have_http_status(:ok)
      expect(Player.exists?(guest_player.id)).to be false
    end
  end
end
