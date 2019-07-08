module Api::V1
  class UsersController < ApiController
    before_action :authenticate_token!, except: [:create]

    def show
      options = {}
      options[:meta] = { total: 1 }
      options[:include] = [:lists]
      render json: UserSerializer.new(@current_user, options).serialized_json
    end

    def create
      user = User.new(user_params)
      if user.save
        UserMailer.activation_needed_email(user).deliver_later
        render json: UserSerializer.new(user).serialized_json
      else
        render json: { errors: [user.errors.messages] }, status: 422
      end

    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
    end
      


  end
end
