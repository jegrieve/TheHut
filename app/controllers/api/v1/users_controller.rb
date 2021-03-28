class Api::V1::UsersController < ApplicationController
  def index
  end

  def create
  end

  def show
    @user = User.find(params[:id])
    if @user
        render :json => @user.to_json( :include => [:posts, :comments, :boards])
    else
        render json: @user.errors
    end
  end

  def destroy
  end

  def update
  end
end
