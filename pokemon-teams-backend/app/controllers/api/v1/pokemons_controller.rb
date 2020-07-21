class Api::V1::PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy!
  end

end