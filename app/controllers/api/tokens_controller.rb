module Api
  class TokensController < ApplicationController
    before_action :set_current_player
    before_action :set_token

    def show
      #Prevents player from seeing undiscovered tokens
      unless @player.owns_token?(@token.id)
        return render json: { error: 'Player does not have this token.' },
        status: :unauthorized
      end

      render 'api/tokens/show',
      status: :ok
    end

    private

    def set_current_player
      @player = current_player
      render json: { error: 'Player not found.' },
      status: :not_found unless @player
    end

    def set_token
      @token = Token.find_by(id: params[:id])
      return render json: { error: 'Token not found.' },
      status: :not_found unless @token
    end
  end
end
