Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :trainers 
      resources :pokemons
      
    end
  end
end
