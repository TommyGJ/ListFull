class Api::V1::UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token
  def entity_name
    'User'
  end 

  def create
    user = User.find_by!(email: params[:auth][:email])
    if user.email_confirmed 
      render json: auth_token, status: :created
    else
      render json: ErrorSerializer.active_record_serialize("has not been found", "422", "email_confirmation"), status: "422" 
    end
  end


  private
  def auth_params
    params.require(:auth).permit(:email, :password)
  end

end
