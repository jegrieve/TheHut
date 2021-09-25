class Api::V1::CommentsController < ApplicationController
    def index
        comments = Post.find(params[:id]).comments
        comment_length = comments.length
        if comments && params[:length]
            render json: {comment_length: comment_length}
        elsif comments
            render json: comments.order(created_at: :desc).limit(params[:limit])
        else
            render json: comments
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        comment = user.comments.new(comment_params)
        comment.post_id = params[:id]
        if comment.save
            render json: comment
        else
            render json: comment.errors
        end
    end

    
    def update
        comment = Comment.find(params[:id])
        if comment
            comment.update(body: params[:body])
            render json: comment
        end
    end

    def destroy
        if (session[:user_id] && params[:id])
            Comment.find(params[:id]).destroy
            render json: {message: "Comment Deleted"}
        end
      end
    


    private

    def comment_params
        params.permit(:body)
    end
end
