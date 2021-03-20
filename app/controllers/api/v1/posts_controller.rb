class Api::V1::PostsController < ApplicationController
    def index
        @posts = Post.all
        render json: @posts
    end
    def create
        user = User.find_by(id: session[:user_id])
        @post = user.posts.create(post_params)
        render json: @post
    end
    private

    def post_params
        params.permit(:title, :body, :image)
    end
end
