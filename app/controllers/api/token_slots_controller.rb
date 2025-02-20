module Api
  class TokenSlotsController < ApplicationController
    before_action :set_current_player

    def update_token_slots
      ActiveRecord::Base.transaction do
        params[:token_slots].each do |slot_params|
          #Confirms player owns the slot and player owns the token
          slot = @player.token_slots.find(slot_params[:id])
          token = @player.tokens.find_by(id: slot_params[:token_id]) if slot_params[:token_id].present?

          #If the player does not own the token or the token doesn't exist, it returns an error.
          if slot_params[:token_id].present? && token.nil?
            return render json: { error: 'Player does not own this token.' }, status: :unprocessable_entity
          end

          #Deletes slotted_token association, includding unequipping tokens for empty slots.
          slot.slotted_token&.destroy!

          #Only adds a token if there's a token present, can unequip a slot and no error will return 
          slot.create_slotted_token!(token_id: token.id) if token.present?
        end
      end

      render json: { success: true }, status: :ok
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end
  

    private

    def set_current_player
      @player = current_player
      render json: { error: 'Player not found.' },
      status: :not_found unless @player
    end
  end
end
