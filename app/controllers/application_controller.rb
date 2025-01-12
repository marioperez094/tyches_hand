class ApplicationController < ActionController::Base

  private

  def current_player 
    @current_player ||= authenticate_current_player
  end

  def authenticate_current_player
    token = cookies.signed[:tyches_hand_session_token]
    return nil unless token

    session = Session.find_by(token: token)
    return nil unless session
    
    @current_player = session.player
  end
end