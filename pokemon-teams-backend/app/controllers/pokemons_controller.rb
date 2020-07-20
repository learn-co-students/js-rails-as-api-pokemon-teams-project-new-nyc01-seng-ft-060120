class PokemonsController < ApplicationController
    def index 
        pokemons = Pokemon.all

        render json: pokemons
    end #my comment

    def create 
        pokemon = Pokemon.create(poke_params)

        render json: pokemon
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy

        render json: {message: 'success'}
    end

    private

    def poke_params
        params.require(:pokemon).permit(:species, :nickname, :trainer_id)
    end
end
