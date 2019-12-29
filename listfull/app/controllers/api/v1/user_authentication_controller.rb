module Api::V1
  class UserAuthenticationController < ApiController

    def authenticate
      login(params[:auth][:email], params[:auth][:password]) do |user, failure|
        if user && !failure
          render json: { token: AccessToken.encode(sub: user.id, email: user.email), refresh_token: RefreshToken.encode(sub: user.id, email: user.email) }, status: :ok
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

    private

    def user_params
      params.require(:user).permit(:email, :password)
    end
  end
end
