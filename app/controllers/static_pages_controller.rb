class StaticPagesController < ApplicationController
  before_action :authenticate_player!, only: [:player_stats] 

  def login
    render "login"
  end

  def player_stats
    render 'player_stats'
  end
end
