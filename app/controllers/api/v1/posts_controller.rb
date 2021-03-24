class Api::V1::PostsController < ApplicationController
    def index
        @posts = Post.limit(params[:limit]).offset(params[:offset])
        render json: @posts
    end

    def show
        @post = Post.find(params[:id])
        if post
            render json: @post
        else
            render json: @post.errors
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        @post = user.posts.create(post_params)
    end
    private

    def post_params
        params.permit(:title, :body, :image)
    end
end
