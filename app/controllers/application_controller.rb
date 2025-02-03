class ApplicationController < ActionController::Base

  private

  def current_player
    @player ||= authenticate_current_player
  end

  def set_current_player 
    @player ||= authenticate_current_player
    render json: { error: 'Player not found.' },
    status: :not_found unless @player
  end

  #Fetches the player's sessions from the signed cookie
  def authenticate_current_player
    token = cookies.signed[:tyches_hand_session_token]
    return unless token

    session = Session.find_by(token: token)
    session&.player
  end

  def authenticate_player!
    redirect_to root_path unless current_player
  end
end