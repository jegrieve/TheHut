class Api::V1::RegistrationsController < ApplicationController
    def create
        user = User.new(user_params)
        if user.save
            session[:user_id] = user.id
            render json: user
        else
            render json: user.errors
        end
    end

    private
    def user_params
        params.require(:registration).permit(:username,:email,:password,:password_confirmation)
    end
end
