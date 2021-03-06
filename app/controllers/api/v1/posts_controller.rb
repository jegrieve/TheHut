class Api::V1::PostsController < ApplicationController
    def index
        if (params[:filter] == "newest")
            posts = Post.order(created_at: :desc).limit(params[:limit])
        elsif (params[:filter] == "likes")
            posts = Post.order(likes_count: :desc).limit(params[:limit])
        elsif (params[:filter] == "comments")
            posts = Post.order(comments_count: :desc).limit(params[:limit])
        else
            posts = Post.order(created_at: :asc).limit(params[:limit]) 
        end
        render json: posts
    end

    def show
        post = Post.find(params[:id])
        if post
            render json: post
        else
            render json: post.errors
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        post = user.posts.new(post_params)
        post.board_id = params[:board_id]
        post.video_link = params[:video]
        post.save
        render json: post
    end

    def update
        post = Post.find(params[:id])
        if post && params[:type] == "image"
            post.update(image: params[:image])
            render json: post
        elsif post
            post.update(body: params[:body], video_link: params[:video_link], title: params[:title])
            render json: post
        end
    end

    def destroy
        if (session[:user_id] && params[:id])
            Post.find(params[:id]).destroy
            render json: {message: "Post Deleted"}
        end
      end
    

    private

    def post_params
        params.permit(:title, :body, :image)
    end
end
