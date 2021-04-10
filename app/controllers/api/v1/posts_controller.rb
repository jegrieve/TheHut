class Api::V1::PostsController < ApplicationController
    def index
        if (params[:filter] == "newest")
        @posts = Post.order(created_at: :desc).limit(params[:limit]).offset(params[:offset])
        else
        @posts = Post.order(created_at: :asc).limit(params[:limit]).offset(params[:offset])   
        end
        render json: @posts
    end

    def show
        @post = Post.find(params[:id])
        if @post
            render json: @post
        else
            render json: @post.errors
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        @post = user.posts.new(post_params)
        @post.board_id = params[:board_id]
        @post.save
        render json: @post
    end
    private

    def post_params
        params.permit(:title, :body, :image)
    end
end
