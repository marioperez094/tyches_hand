require 'rails_helper'

RSpec.describe Api::TokenSlotsController, type: :controller do
  render_views

  let(:player) { FactoryBot.create(:player) }
  let!(:token_slots) { player.token_slots } # Ensure 6 slots are created
  let(:token1) { FactoryBot.create(:token, name: 'Ear of Tyche', rune: 'I') }
  let(:token2) { FactoryBot.create(:token) }
  let(:token3) { FactoryBot.create(:token, name: 'Heart of Tyche', rune: 'H')}

  before do
    session[:player_id] = player.id # Simulate authentication
    controller.instance_variable_set(:@player, player) # Ensure @player is set
  end

  describe 'PATCH /players/:player_id/token_slots/update_slots' do
    it 'updates all 6 token slots successfully' do
      player.tokens << [token1, token2, token3]

      update_params = {
        token_slots: [
          { id: 1, token_id: token1.id }, 
          { id: 2, token_id: token2.id }, 
          { id: 3, token_id: token3.id }, 
          { id: 4, token_id: nil }, 
          { id: 5, token_id: nil }, 
          { id: 6, token_id: nil }
        ]
      }

      put :update_token_slots, params: update_params

      expect(response).to have_http_status(:ok)
      expect(player.token_slots.first.token.id).to eq(1)
      expect(player.token_slots.second.token.id).to eq(2)
      expect(player.token_slots.third.token.id).to eq(3)
      expect(player.token_slots.fourth.token).to be_nil
      expect(player.token_slots.fifth.token).to be_nil
      expect(player.token_slots[5].token).to be_nil
    end

    it 'prevents assigning the same token to multiple slots' do
      player.tokens << [token1, token2, token3]

      update_params = {
        token_slots: [
          { id: 1, token_id: token1.id },
          { id: 2, token_id: token1.id }
        ]
      }

      put :update_token_slots, params: update_params

      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to include("This token is already equipped in another slot.")

    end

    it 'allows unequipping a token' do
      token_slots.first.create_slotted_token!(token: token1)

      update_params = {
        token_slots: [{ id: token_slots.first.id, token_id: nil }]
      }

      put :update_token_slots, params: update_params

      expect(response).to have_http_status(:ok)
      expect(token_slots.first.slotted_token).to be_nil
    end

    it 'returns an error when assigning a token the player does not own' do
      other_token = FactoryBot.create(:token, name: 'Toe of Tyche', rune: 'T')

      update_params = {
        token_slots: [{ id: token_slots.first.id, token_id: other_token.id }]
      }

      put :update_token_slots, params: update_params

      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to include("Player does not own this token.")
    end
  end
end
