class Api::V1::CommentsController < ApplicationController
    def index
        @comments = Post.find(params[:id]).comments
        if @comments
            render json: @comments
        else
            render json: @comments.errors
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        @comment = user.posts.create(post_params)
        @comment.post_id = params[:id]

        render json: @comment
    end
end
