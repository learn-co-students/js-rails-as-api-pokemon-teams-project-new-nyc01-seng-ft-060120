class PokemonsController < ApplicationController
    def index
        pokemon = Pokemon.all
        render json:pokemon
    end

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])

        render json:pokemon, except: [:created_at, :updated_at]
    end 

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon, except: [:created_at, :updated_at]
    end
    
    def destroy
        Pokemon.find(params[:id]).destroy
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end

end
