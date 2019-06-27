class Api::V1::UserConfirmationController < ApiController
  def entity_name
    'User'
  end 

  def confirm_email
    user = User.find_by_confirm_token(params[:id])
    if user
      user.email_activate
    end
    redirect_to root_url
  end
end
