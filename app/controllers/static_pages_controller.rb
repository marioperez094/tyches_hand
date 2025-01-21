class StaticPagesController < ApplicationController
  before_action :authenticate_player!, only: [:start_screen] 

  def start_screen
    render "start_screen"
  end

  def login
    render "login"
  end
end
