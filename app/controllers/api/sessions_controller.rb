module Api
  class SessionsController < ApplicationController
    def create

      @player = Player.find_by(username: params[:player][:username])

      return render json: { error: "Player not found." },
      status: :not_found if !@player

      unless @player && @player.authenticate(params[:player][:password])
        return render json: {
          error: "The username or password is invalid."
        }, status: :unauthorized
      end
      
      session = @player.sessions.create

      cookies.signed[:tyches_hand_session_token] = {
        value: session.token,
        httponly: true,
      }

      render json: { success: true }
    end

    def destroy
      session = Session.find_by(token: cookies.signed[:tyches_hand_session_token])

      return render json: { error: "Session not found." },
      status: :not_found if !session

      if session.player.guest
        session.player.destroy
      end

      session.destroy
      cookies.delete(:tyches_hand_session_token)

      render json: { success: true }
    end

    def authenticated
      if current_player
        return render json: { authenticated: true }
      end

      render json: { authenticated: false }
    end
  end
end