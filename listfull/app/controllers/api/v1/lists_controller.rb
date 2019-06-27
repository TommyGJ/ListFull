class Api::V1::ListsController < ApiController
  before_action :set_list
  before_action :authenticate_user

  def show
  end

  private

  def set_list
    @list = List.find(params[:id])
  end

  
end
