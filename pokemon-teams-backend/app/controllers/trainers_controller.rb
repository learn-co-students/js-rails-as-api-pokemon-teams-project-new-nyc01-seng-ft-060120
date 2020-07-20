class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers.to_json(include: [:pokemons])
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        if trainer
            render json: trainer.to_json(include: [:pokemons])
        else
            render json: {message: 'No trainer'}
        end
    end

end
