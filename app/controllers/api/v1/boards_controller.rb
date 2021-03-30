class Api::V1::BoardsController < ApplicationController
    def index
        if params[:limit]
            @boards = Board.limit(params[:limit]).offset(params[:offset])
        else
            @boards = Board.all
        end
        render json: @boards
    end

    def create
        user = User.find_by(id: session[:user_id])
        @board = user.boards.create(board_params)
    end

    def show
        @board = Board.find(params[:id])
        if @board && params[:limit]
            @posts = @board.posts.limit(params[:limit]).offset(params[:offset])
            render json: @posts
            #render :json => @board.to_json( :include => [:posts])
        else
            render json: @board
        end
    end
    private
    def board_params
        params.permit(:title, :body, :board_image)
    end
end
