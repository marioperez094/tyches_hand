Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api do
    resources :players, only: [:create, :index, :show, :destroy]

    #Players
    put '/players/:id/convert_to_registered' => 'players#convert_to_registered'
    put '/players/:id/update_password' => 'players#update_password'
  end
end
