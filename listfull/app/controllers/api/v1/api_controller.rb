module Api::V1
  class ApiController < ApplicationController
    before_action :set_default_format
    protect_from_forgery with: :null_session
    
    private

    def set_default_format
      request.format = :json
    end

    def authenticate_token!
      begin
        payload = AccessToken.decode(auth_token)
        @current_user = User.find(payload['sub'])
      rescue JWT::ExpiredSignature
        print "expired_signature"
        render json: {errors: ["Expired Token"]}, status: :unauthorized
      rescue JWT::DecodeError
        print "decode_error"
        render json: {errors: ["Invalid Token Authorization"]}, status: :unauthorized
      end

    end

    def auth_token
      @auth_token ||= request.headers.fetch("Authorization","").split(" ").last
    end

  end
end



