module Api
  class CardsController < ApplicationController
    def show
      @card = set_card

      return render json: { error: 'Card not found.' },
      status: :not_found if !@card

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