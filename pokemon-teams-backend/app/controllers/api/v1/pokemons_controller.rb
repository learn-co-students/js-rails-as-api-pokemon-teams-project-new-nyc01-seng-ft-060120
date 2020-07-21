class Api::V1::PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    nickname = Faker::Name.name 
    species = Faker::Games::Pokemon.name
    render json: Pokemon.create!(
      nickname: nickname,
      species: species,
      trainer_id: pokemon_params[:trainer_id]), except: [:created_at, :updated_at]
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy!
  end

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end

end