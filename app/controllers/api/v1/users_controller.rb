class Api::V1::UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    if user
      if params[:post]
        render json: {last_post: user.posts.last}
      elsif params[:board]
        render json: {last_board: user.boards.last}
      else
        render json: user
      end
    else
        render json: user.errors
    end
  end

  def destroy
    if (session[:user_id] && params[:id])
        session[:user_id] = nil
        User.find(params[:id]).destroy
        render json: {message: "User Deleted"}
    end
  end

  def update
    user = User.find(params[:id])
    if user && params[:profile_image]
        user.update(profile_image: params[:profile_image])
        render json: user
    elsif user && params[:bio]
        user.update(bio: params[:bio])
        render json: user   
    end
end
end

