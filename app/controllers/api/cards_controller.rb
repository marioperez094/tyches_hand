module Api
  class CardsController < ApplicationController
    before_action :current_player

    def show
      @card = set_card
      
      return render json: { error: 'Card not found.' },
      status: :not_found if !@card

      unless @player.cards.include?(@card)
        return render json: { error: 'Player does not have this card.' }, 
        status: :unauthorized
      end

      render 'show', 
      status: :ok
    end

    private 
    
    def set_card
      card = Card.find_by(id: params[:id])
      card
    end
  end
end