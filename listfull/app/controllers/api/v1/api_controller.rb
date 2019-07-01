module Api::V1
  class ApiController < ApplicationController
    before_action :set_default_format
    protect_from_forgery with: :null_session
    
    private

    def set_default_format
      request.format = :json
    end

    def authenticate_token!
      payload = JsonWebToken.decode(auth_token)
      if payload.present?
        @current_user = User.find(payload['sub'])
        p @current_user
      else
        render json: {errors: ["Invalid Token Authorization"]}, status: :unauthorized
      end
    rescue JWT::DecodeError
#    rescue JWT::ExpiredSignature
      render json: {errors: ["Invalid Token Authorization"]}, status: :unauthorized
    end

    def auth_token
      @auth_token ||= request.headers.fetch("Authorization","").split(" ").last
    end

  end
end



