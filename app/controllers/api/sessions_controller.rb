module Api
  class SessionsController < ApplicationController
    def create
      @player = Player.find_by(username: params[:player][:username])

      return render json: { error: "Player not found." },
      status: :not_found unless @player

      unless @player&.authenticate(params[:player][:password])
        return render json: {
          error: "Invalid username or password."
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
      status: :not_found unless session

      if session.player.guest
        session.player.deck&.destroy
        session.player.collections.destroy_all
        session.player.destroy
      end

      session.destroy
      cookies.delete(:tyches_hand_session_token)

      render json: { success: true }
    end

    def authenticated
      session = Session.find_by(token: cookies.signed[:tyches_hand_session_token])

      if session&.expired? 
        session.destroy
        cookies.delete(:tyches_hand_session_token)
        return render json: { authenticated: false, error: "Session expired." }
      end

      if session&.player&.guest
        session.player&.deck&.destroy
        session.player&.collections.destroy_all
        session.player.destroy
      end

      render json: { authenticated: current_player.present? }
    end
  end
end