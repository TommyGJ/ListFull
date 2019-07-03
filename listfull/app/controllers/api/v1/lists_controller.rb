module Api::V1
  class ListsController < ApiController
    before_action :authenticate_token!

    def show
      @list = List.find(params["id"])
      if @current_user.ownsList?(@list) 
        options = {}
        options[:meta] = { total: 1 }
        options[:include] = [:items]
        render json: ListSerializer.new(@list, options).serialized_json
      else
        render json: { errors: [ :user => ["does not have permision to access this list" ]]}, status: 403 
      end
    rescue ActiveRecord::RecordNotFound
      render json: { errors: [ :list => ["does not exist" ]]}, status: 404 


    end
  end
end

