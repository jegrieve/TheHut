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
        render json: @board
    end

    def show
        @board = Board.find(params[:id])
        if @board && params[:posts]
            if (params[:filter] == "newest")
                @posts = @board.posts.order(created_at: :desc).limit(params[:limit])
            else
                @posts = @board.posts.order(created_at: :asc).limit(params[:limit])
            end
                render json: @posts
        else
            render json: @board
        end
    end

    def update
        board = Board.find(params[:id])
        if board && params[:type] == "image"
            board.update(image: params[:image])
            render json: board
        elsif board
            board.update(body: params[:body], title: params[:title])
            render json: board
        end
    end

    def destroy
        if (session[:user_id] && params[:id])
            Board.find(params[:id]).destroy
            render json: {message: "Board Deleted"}
        end
      end


    private
    def board_params
        params.permit(:title, :body, :board_image)
    end
end
