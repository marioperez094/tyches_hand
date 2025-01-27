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

    def update_cards_in_deck
      return render json: { error: 'Player not found.' },
      status: :not_found if !@player
      
      set_deck

      new_card_ids = params[:deck][:cards].map { |card| card[:id].to_i }

      if new_card_ids.size != 52
        return render json: { error: "A deck must contain exactly 52 cards." }, status: :unprocessable_entity
      end

      current_card_ids = @deck.cards.pluck(:id)

      card_ids_to_add = new_card_ids - current_card_ids
      card_ids_to_remove = current_card_ids - new_card_ids


      card_ids_to_add.each do |card_id|
        card = @player.cards.find_by(id: card_id)
        if card
          @deck.cards_in_deck.create!(card_id: card_id)
        else 
          return render json: { error: "Card #{ card.name } does not belong to the player"},
          status: :unprocessable_entity
        end
      end

      @deck.cards_in_deck.where(card_id: card_ids_to_remove).destroy_all
      
      if @deck.save
        render 'api/decks/show', status: :ok
      else
        render json: { errors: @deck.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_deck
      @deck = @player.deck
      return render json: { error: 'Deck not found.' },
      status: :not_found if !@deck
      @deck
    end

    def deck_params
      params.require(:deck).permit(:name, :cards)
    end
  end
end