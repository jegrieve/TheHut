class Api::V1::PostsController < ApplicationController
    def index
        @posts = Post.limit(params[:limit]).offset(params[:offset])
        render :json => @posts.to_json( :include => [:liking_users])
    end

    def show
        @post = Post.find(params[:id])
        if @post
            render :json => @post.to_json( :include => [:liking_users])
        else
            render json: @post.errors
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        @post = user.posts.new(post_params)
        @post.board_id = params[:board_id]
        @post.save
    end
    private

    def post_params
        params.permit(:title, :body, :image)
    end
end
