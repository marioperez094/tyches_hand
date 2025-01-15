module Api
  class DecksController < ApplicationController
    before_action :current_player
    def create
      return render json: { error: 'Player not found.' },
      status: :not_found if !@player

      @deck = Deck.new(deck_params)
      @deck.player = @player

      if @deck.save
        render 'api/decks/show',
        status: :created
      else
        render json: { error: @deck.errors },
        status: :bad_request
      end
    end

    def rename_deck
      return render json: { error: 'Player not found.' },
      status: :not_found if !@player

      set_deck
      
      begin
        @deck.update(name: params[:deck][:name])

        render 'api/decks/show',
        status: :ok
      rescue ArgumentError => e
        render json: { error: e.message },
        status: :bad_request
      end
    end

    def swap_cards
      set_deck

      card_removed = @deck.cards.find_by(id: params[:card_removed])
      return render json: { error: 'Card to remove not found.' },
      status: :not_found if !card_removed

      card_added = @player.cards.find_by(id: params[:card_added])
      return render json: { error: 'Card to add not found.' },
      status: :not_found if !card_added

      @deck.cards.delete(card_removed)
      @deck.cards << card_added
      
      if @deck.save
        render 'api/decks/show', status: :ok
      else
        render json: { errors: @deck.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_deck
      @deck = Deck.find_by(id: params[:id])
      return render json: { error: 'Deck not found.' },
      status: :not_found if !@deck
      @deck
    end

    def deck_params
      params.require(:deck).permit(:name)
    end
  end
end