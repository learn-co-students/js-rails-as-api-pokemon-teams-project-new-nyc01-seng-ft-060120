Rails.application.routes.draw do
  resources :pokemons, only: [:index, :show, :destroy, :create]
  resources :trainers, only: [:index]
end
