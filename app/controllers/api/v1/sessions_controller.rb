class Api::V1::SessionsController < ApplicationController
    def new
    end

    def create
        user = User.find_by(username: params[:username])
        if user.present? && user.authenticate(params[:password]) 
            session[:user_id] = user.id
            @user = user
            render json: @user 
        else
            render json: user
        end
    end

    def destroy
        session[:user_id] = nil
    end
end
