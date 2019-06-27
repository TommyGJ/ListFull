class Api::V1::UsersController < ApiController
  before_action :set_user, except: [:create]
  before_action :authenticate_user, except: [:create, :new]

  def show
    render json: @user, include: ['lists'] 
    #render json: @user
  end

  def create
    @user = User.new(user_params) 
    if @user.save
      render json: @user
      UserMailer.registration_confirmation(@user).deliver
    else
      render json: ErrorSerializer.serialize(@user.errors.messages)
    end
  rescue ActiveRecord::ActiveRecordError => e
    render json: ErrorSerializer.active_record_serialize(e.to_s, "409 Conflict", "email", "already in use")
  end

  private

  def set_user
    @user = User.find(params[:id]) 
  end

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end

end
