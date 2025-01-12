Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api do
    resources :players, only: [:create, :index, :show, :destroy]
    resources :sessions, only: [:create]
    resources :cards, only: [:show]

    #Players
    put '/players/:id/convert_to_registered' => 'players#convert_to_registered'
    put '/players/:id/update_password' => 'players#update_password'

    #Sessions
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions' => 'sessions#destroy'
  end
end
