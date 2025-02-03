require 'rails_helper'

RSpec.describe Api::PlayersController, type: :controller do
  render_views

  let(:player) { FactoryBot.create(:player, password: "password123", password_confirmation: "password123") }
  let(:guest_player) { FactoryBot.create(:player, username: nil, password: nil, password_confirmation: nil, guest: true) }
  let(:session) { FactoryBot.create(:session, player: player) }

  before do
    session[:player_id] = player.id # Simulate authentication
    controller.instance_variable_set(:@player, player) # Ensure @player is set
  end

  describe "POST #create" do
    let(:valid_params) { { player: { username: "NewPlayer", password: "securepass", password_confirmation: "securepass" }, recaptcha_token: "valid_token" } }

    before do
      allow(RecaptchaV3Verifier).to receive(:verify).and_return(true) # Mock reCAPTCHA success
    end

    it "creates a new player successfully" do
      post :create, params: valid_params, format: :json
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["success"]).to eq(true)
    end

    it "returns an error when reCAPTCHA fails" do
      allow(RecaptchaV3Verifier).to receive(:verify).and_return(false)
      post :create, params: valid_params, format: :json
      expect(response).to have_http_status(:unauthorized)
    end

    it "returns an error if player creation fails" do
      allow_any_instance_of(Player).to receive(:save).and_return(false)
      post :create, params: valid_params, format: :json
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe "GET #index" do
    it "returns a list of players" do
      FactoryBot.create(:player, username: "Hi")
      FactoryBot.create(:player, username: "Hello")
      FactoryBot.create(:player, username: "Howdy")
      get :index, format: :json
      
      expect(response).to have_http_status(:ok)

      parsed_response = JSON.parse(response.body) # Parse the full JSON object
      expect(parsed_response["players"].size).to be >= 3 # Ensure at least 3 players exist
    end
  end

  describe "GET #show" do
    it "returns player data" do
      get :show, params: { id: player.id }, format: :json
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(player.username)
    end
  end

  describe "POST #player_discover_cards" do
    it "allows the player to discover cards" do
      allow(player).to receive(:discover_cards).and_return([Card.first, Card.second])
      post :player_discover_cards, format: :json
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["cards"].size).to eq(2)
    end
  end

  describe "PATCH #convert_to_registered" do
    it "converts a guest account to a registered player" do
      session[:player_id] = guest_player.id # Simulate authentication
      controller.instance_variable_set(:@player, guest_player) # Ensure @player is set

      post :convert_to_registered, params: { player: { username: "RegisteredUser", password: "newpassword" } }
      expect(response).to have_http_status(:ok)

      guest_player.reload
      expect(guest_player.guest).to be false
    end

    it "returns an error if the player is already registered" do
      post :convert_to_registered, params: { player: { username: "AlreadyRegistered", password: "newpassword" } }
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe "PATCH #update_password" do
    it "updates the player's password successfully" do
      post :update_password, params: { player: { password: "password123", new_password: "newsecurepass" } }
      expect(response).to have_http_status(:ok)
    end

    it "returns an error if the current password is incorrect" do
      post :update_password, params: { player: { password: "wrongpassword", new_password: "newsecurepass" } }
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "DELETE #destroy" do
    it "deletes the player if authenticated" do
      delete :destroy, params: { id: player.id, player: { password: "password123" } }
      expect(response).to have_http_status(:ok)
      expect(Player.exists?(player.id)).to be false
    end

    it "returns an error if the password is incorrect" do
      delete :destroy, params: { id: player.id, player: { password: "wrongpassword" } }
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
