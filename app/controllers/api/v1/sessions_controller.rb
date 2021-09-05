class Api::V1::SessionsController < ApplicationController
    def index
        if session[:user_id] 
            user = User.find_by(id: session[:user_id])
            render json: user
        end
    end

    def create
        user = User.find_by(username: params[:username])
        if user.present? && user.authenticate(params[:password]) 
            session[:user_id] = user.id
            render json: user
        else
            render json: nil
        end
    end

    def destroy
        session[:user_id] = nil
        if (!session[:user_id])
            render json: true
        else
            render json: false
        end
    end
end
