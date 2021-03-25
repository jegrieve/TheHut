class Api::V1::CommentsController < ApplicationController
    def index
        @comments = Post.find(params[:id]).comments.limit(params[:limit]).offset(params[:offset])
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
        @comment.save

        render json: @comment
    end

    private

    def comment_params
        params.permit(:body)
    end
end
