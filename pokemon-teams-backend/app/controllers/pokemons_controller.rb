class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon, except: [:created_at, :updated_at] 

  end
end
