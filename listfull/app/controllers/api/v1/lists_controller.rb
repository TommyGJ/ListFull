module Api::V1
  class ListsController < ApiController
    before_action :authenticate_token!

    def show
      @list = List.find(params["id"])
      if @current_user.canAccessList?(@list) 
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

    def create
      list = List.new(name: list_params["name"], deadline: Time.at(list_params["deadline"].to_f / 1000))
      if list.save
        list.users << @current_user
        list.make_owner!(@current_user)
        render json: ListSerializer.new(list).serialized_json
      else
        render json: { errors: [list.errors.messages] }, status: 422 
      end
    end

    def destroy
      @list = List.find(params["id"])
      if @current_user == @list.owner
        @list.destroy
      else
        render json: { errors: [ :list => ["does not belong to user" ]]}, status: 403 
      end
    rescue ActiveRecord::RecordNotFound
      render json: { errors: [ :list => ["does not exist" ]]}, status: 404 
    end

    private 

    def list_params
      params.require(:list).permit(:name, :deadline)
    end
  end
end

