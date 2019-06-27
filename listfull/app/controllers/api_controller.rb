class ApiController < ApplicationController
  include Knock::Authenticable
  before_action :set_default_format
  protect_from_forgery with: :null_session
  undef_method :current_user


  private

  def set_default_format
    request.format = :json
  end
end
