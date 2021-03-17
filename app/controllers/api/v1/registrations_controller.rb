class Api::V1::RegistrationsController < ApplicationController
    def index
    end
  
    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user
        else
            render json: @user.errors
        end
    end

    private
    def user_params
        params.require(:user).permit(:username,:email,:password, :password_confirmation)
    end
end
