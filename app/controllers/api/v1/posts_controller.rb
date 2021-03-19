class Api::V1::PostsController < ApplicationController
    def index
        @posts = Post.all
        render json: @posts
    end
    def create
        @post = Post.create(post_params)
    end
    private

    def post_params
        params.permit(:title, :body, :image)
    end
end
