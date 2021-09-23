class Api::V1::LikesController < ApplicationController
    def create
        user = User.find_by(id: session[:user_id])
        like = user.likes.new
        like.post_id = params[:post_id]
        like.save
        render json: like
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        post = user.likes.find_by(post_id: params[:id])
        post.destroy
        render json: {message: 'Unliked this post'}
    end
end
