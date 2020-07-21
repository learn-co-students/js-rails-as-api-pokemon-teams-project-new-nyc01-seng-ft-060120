class PokemonsController < ApplicationController
require 'faker'

    def create
        pokemon = Pokemon.new(pokemon_params)
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.save
        render json:pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

    private
    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
