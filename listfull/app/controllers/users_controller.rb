class UsersController < ApplicationController
#  skip_before_filter :require_login, :only => [:index, :new, :create, :activate]

  def activate
    if @user = User.load_from_activation_token(params[:id])
      @user.activate!
      redirect_to(login_path, :notice => 'User was successfully activated.')
    else
       not_authenticated
    end
  end
end
