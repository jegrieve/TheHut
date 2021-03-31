class Api::V1::LikesController < ApplicationController
    def index

    end

    def create
        user = User.find_by(id: session[:user_id])
        @like = user.likes.new(post_id: params[:post_id])
        @like.save
        render json: @like
    end
end
