class Api::V1::TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers
  end

end
