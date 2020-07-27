class PokemonsController < ApplicationController
    def index 
        pokemons = Pokemon.all

        render json: pokemons
    end

    def create 
        pokemon = Pokemon.create(poke_params)
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.nickname = Faker::Name.first_name
        pokemon.save

        render json: pokemon
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy

        render json: {message: 'success'}
    end

    private

    def poke_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
