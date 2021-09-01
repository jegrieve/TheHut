class Api::V1::CommentsController < ApplicationController
    def index
        @comments = Post.find(params[:id]).comments.order(created_at: :desc).limit(params[:limit])
        if @comments
            render json: @comments
        else
            render json: @comments.errors
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        @comment = user.comments.new(comment_params)
        @comment.post_id = params[:id]
        if @comment.save
            render json: @comment
        else
            render json: @comment.errors
        end
    end

    private

    def comment_params
        params.permit(:body)
    end
end
