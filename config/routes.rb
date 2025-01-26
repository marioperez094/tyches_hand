Rails.application.routes.draw do
  root to: "static_pages#login"
  
  get 'player/stats' => "static_pages#player_stats"

  namespace :api do
    resources :players, only: [:create, :index, :destroy]
    resources :sessions, only: [:create]
    resources :cards, only: [:show]
    resources :decks, only: [:create]

    #Players
    get '/players/show' => 'players#show'
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
  
  #Redirects react-router links on reload
  get '*path' => redirect('/player/stats')
end
