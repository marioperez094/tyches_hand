class ApplicationController < ActionController::Base

  private

  def current_player 
    @player ||= authenticate_current_player
  end

  def authenticate_current_player
    token = cookies.signed[:tyches_hand_session_token]
    return nil unless token

    session = Session.find_by(token: token)
    return nil unless session
    
    @player = session.player
  end

  def authenticate_player!
    unless current_player
      redirect_to '/'
    end
  end
end