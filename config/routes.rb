Rails.application.routes.draw do
  root to: "static_pages#start_screen"

  get 'login' => 'static_pages#login'

  namespace :api do
    resources :players, only: [:create, :index, :show, :destroy]
    resources :sessions, only: [:create]
    resources :cards, only: [:show]
    resources :decks, only: [:create]

    #Players
    put '/players/:id/convert_to_registered' => 'players#convert_to_registered'
    put '/players/update_password' => 'players#update_password'
    post '/players/cards/discover' => 'players#player_discover_cards'

    #Sessions
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions' => 'sessions#destroy'

    #Decks
    put '/decks/:id/rename' => 'decks#rename_deck'
    put '/decks/:id/cards/:card_removed/:card_added' => 'decks#swap_cards'
  end
end
