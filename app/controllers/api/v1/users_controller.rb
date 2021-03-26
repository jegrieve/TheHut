class Api::V1::UsersController < ApplicationController
  def index
  end

  def create
  end

  def show
    @user = User.find(params[:id])
    if @user
        render json: @user
    else
        render json: @user.errors
    end
  end

  def destroy
  end

  def update
  end
end
