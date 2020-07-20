class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers
  end

  def show
    trainer = Trainer.find(params[:id])
    render json: trainer.as_json(only: [:name, :id], include: { pokemons: { except: [:created_at, :updated_at] } })
  end
end
