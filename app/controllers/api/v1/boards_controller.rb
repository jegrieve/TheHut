class Api::V1::BoardsController < ApplicationController
    def index
        @boards = Board.all
        render json: @boards
    end

    def create
        @board = Board.create(board_params)
    end

    def show
        @board = Board.find(params[:id])
        if @board
            render json: @board
        else
            render json: @board.errors
        end
    end
    private
    def board_params
        params.permit(:title, :body, :board_image)
    end
end
