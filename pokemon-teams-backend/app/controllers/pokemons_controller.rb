class PokemonsController < ApplicationController
    def index
        pokemon = Pokemon.all
        render json:pokemon
    end

    def new 
        pokemon = Pokemon.new 
    end 

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])

        render json:pokemon
    end 

    private 

    # def pokemon_params 
    #     params.require(:pokemon).permit(:nickname, :species, )
    # end 

end
