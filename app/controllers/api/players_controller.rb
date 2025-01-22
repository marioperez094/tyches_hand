module Api
  class PlayersController < ApplicationController
    before_action :current_player, only: [:show, :convert_to_registered, :update_password, :destroy, :player_discover_cards]

    def create
      # recaptcha_token from front end
      recaptcha_token = params[:recaptcha_token]

      # Verify
      unless RecaptchaV3Verifier.verify(recaptcha_token, 0.5)
        return render json: { error: "reCAPTCHA verification failed" }, status: :unauthorized
      end

      @player = Player.new(player_params)

      if @player.save
        session = @player.sessions.create
        deck = @player.create_deck

        cookies.signed[:tyches_hand_session_token] = {
          value: session.token,
          httponly: true,
        }
        
        render 'api/players/show'

      else
        render json: {
          error: @player.errors
        }, status: :bad_request
      end
    end

    def index
      @players = Player.order(username: :asc)
      render 'api/players/index',
      status: :ok
    end

    def show
      return render json: { error: 'Player not found.' }, 
      status: :not_found if !@player

      @include_decks = params[:deck] == 'true'
      @include_cards = params[:cards] == 'true'
      
      #Sepeartes cards in players collection but not in deck
      @separate_deck_cards = params[:deck_cards] == 'true'

      render 'api/players/show',
      status: :ok
    end

    def player_discover_cards
      return render json: { error: 'Player not found.' },
      status: :not_found if !@player

      @cards = @player.discover_cards
      render json: { cards: @cards },
      status: :ok
    end

    def convert_to_registered
      return render json: { error: 'Player not found.' },
      status: :not_found if !@player

      return render json: { error: 'This account is already registered.' },
      status: :forbidden if @player.guest == false

      begin
        @player.update!(username: params[:player][:username], password: params[:player][:password], guest: false)

        render 'api/players/show',
        status: :ok
      rescue ArgumentError => e
        render json: { error: e.message },
        status: :bad_request
      end
    end

    def update_password
      unless @player && @player.authenticate(params[:player][:password])
        return render json: {
          error: "The username or password is invalid."
        }, status: :unauthorized
      end

      begin
        @player.update!(password: params[:player][:new_password])
        render json: { success: true },
        status: :ok
      rescue ArgumentError => e
        render json: { error: e.message },
        status: :bad_request
      end
    end

    def destroy
      unless @player && @player.authenticate(params[:player][:password])
        return render json: {
          error: "The username or password is invalid."
        }, status: :unauthorized
      end
      
      if @player&.destroy
        render json: { success: true }
      else
        render json: { success: false }
      end
    end

    private

    def set_player_by_id
      @player = Player.find_by(id: params[:id])
      
      if @player.nil?
        render json: { error: 'Player not found.' }, status: :not_found
      end
    end

    def player_params
      params.require(:player).permit(:username, :password, :password_confirmation, :guest, :new_password,)
    end
  end
end