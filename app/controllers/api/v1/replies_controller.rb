class Api::V1::RepliesController < ApplicationController
    def index
        replies = Comment.find(params[:id]).replies
        replies_length = replies.length
        if replies && params[:length]
            render json: {replies_length: replies_length}
        elsif replies
            render json: replies.order(created_at: :desc).limit(params[:limit])
        else
            render json: replies.errors
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        comment = Comment.find(params[:id])
        reply = comment.replies.new(reply_params)
        reply.user_id = user.id
        if reply.save
            render json: reply
        else
            render json: reply.errors
        end
    end

    def update
        reply = Reply.find(params[:id])
        if reply 
            reply.update(body: params[:body])
            render json: reply 
        end
    end

    def destroy
        if (session[:user_id] && params[:id])
            Reply.find(params[:id]).destroy
            render json: {message: "Reply Deleted"}
        end
      end

    private

    def reply_params
        params.permit(:body)
    end
end
