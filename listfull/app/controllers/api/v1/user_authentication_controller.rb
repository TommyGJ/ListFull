module Api::V1
  class UserAuthenticationController < ApiController

    def authenticate
      login(params[:auth][:email], params[:auth][:password]) do |user, failure|
        if user && !failure
          perform_token_grant(user)
        else
          case failure
          when :invalid_login
            render json: { errors: [ :login => ["is invalid (email or password incorrect)"] ] }, status: :not_found
          when :invalid_password
            render json: { errors: [ :login => ["is invalid (email or password incorrect)"] ] }, status: :not_found
          when :inactive
            render json: { errors: [ :account => ["is inactive (check your email to activate)"] ] }, status: 403 
          end
        end
      end
    end

    def issue_new_access_token
      payload = RefreshToken.decode(auth_token)
      user = User.find(payload['sub'])
      if token == user.refresh_token  
        perform_token_grant(user)
      else
        render json: { errors: ["Refresh Token is Invalid"] }, status: :unauthorized
      end
    end

    private

    def auth_token
      @auth_token ||= request.headers.fetch("Authorization","").split(" ").last
    end

    def user_params
      params.require(:user).permit(:email, :password)
    end

    def perform_token_grant(user)
      refresh_token = RefreshToken.encode(sub: user.id, email: user.email)  
      render json: { token: AccessToken.encode(sub: user.id, email: user.email), refresh_token: refresh_token }, status: :ok
      user.update(refresh_token: refresh_token) 
    end

  end
end
