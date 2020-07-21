class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    nickname = Faker::Name.name
    species = Faker::Games::Pokemon.name
    render json: Pokemon.create!(nickname: nickname, species: species, trainer_id: pokemon_params[:trainer_id]), except: [:created_at, :updated_at]
  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon, except: [:created_at, :updated_at]
  end

  def destroy
    Pokemon.find(params[:id]).destroy
  end

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end
end
