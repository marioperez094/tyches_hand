module Api
  class CardsController < ApplicationController
    before_action :set_current_player
    before_action :set_card

    def show
      #Prevents players from seeing undiscovered cards
      unless @player.owns_card?(@card.id)
        return render json: { error: 'Player does not have this card.' }, 
        status: :unauthorized
      end

      render 'api/cards/show', 
      status: :ok
    end

    private 

    def set_current_player
      @player = current_player
      render json: { error: 'Player not found.' },
      status: :not_found unless @player
    end
    
    def set_card
      @card = Card.find_by(id: params[:id])
      return render json: { error: 'Card not found.' },
      status: :not_found unless @card
    end
  end
end