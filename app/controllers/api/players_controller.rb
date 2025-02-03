module Api
  class PlayersController < ApplicationController
    before_action :set_current_player, only: [:show, :convert_to_registered, :update_password, :destroy, :player_discover_cards]
    before_action :authenticate_player!, only: [:update_password, :destroy]

    def create
      # Verify reCAPTCHA token from front end
      unless RecaptchaV3Verifier.verify(params[:recaptcha_token], 0.5)
        return render json: { error: "reCAPTCHA verification failed" }, status: :unauthorized
      end

      @player = Player.new(player_params)

      if @player.save
        session = @player.sessions.create

        cookies.signed[:tyches_hand_session_token] = {
          value: session.token,
          httponly: true,
        }
        
        render json: { success: true }.merge(JSON.parse(render_to_string('api/players/show', formats: [:json]))), 
        status: :ok

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
      @include_decks = params[:deck] == 'true'
      @include_cards = params[:cards] == 'true'
      @separate_deck_cards = params[:deck_cards] == 'true' #Sepeartes cards in players collection but not in deck

      render 'api/players/show',
      status: :ok
    end

    def player_discover_cards
      return render json: { error: 'Player not found.' },
      status: :not_found unless @player

      @cards = @player.discover_cards
      render json: { cards: @cards },
      status: :ok
    end

    def convert_to_registered
      return render json: { error: 'Player not found.' },
      status: :not_found unless @player

      return render json: { error: 'This account is already registered.' },
      status: :forbidden unless @player.guest

      begin
        @player.update!(username: params[:player][:username], password: params[:player][:password], guest: false)

        render json: { success: true }.merge(JSON.parse(render_to_string('api/players/show', formats: [:json]))),
        status: :ok
      rescue ArgumentError => e
        render json: { error: e.message },
        status: :bad_request
      end
    end

    def update_password
      return render json: { error: "Invalid username or password." }, 
      status: :unauthorized unless @player&.authenticate(params[:player][:password])

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
      return render json: { error: "Invalid username or password." }, status: :unauthorized unless @player&.authenticate(params[:player][:password])
      
      @player.force_delete = true #Allows for registered player deletion
      
      if @player&.destroy
        render json: { success: true }
      else
        render json: { success: false }
      end
    end

    private

    def player_params
      params.require(:player).permit(:username, :password, :password_confirmation, :guest, :new_password,)
    end
  end
end