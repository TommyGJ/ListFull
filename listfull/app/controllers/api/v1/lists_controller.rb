module Api::V1
  class ListsController < ApiController
    before_action :authenticate_token!

    def show
      @list = List.find(params["id"])
      if @current_user.canAccessList?(@list) 
        options = {}
        options[:meta] = { total: 1 }
        options[:include] = [:items, :users]
        render json: ListSerializer.new(@list, options).serialized_json
      else
        render json: { errors: [ :user => ["does not have permision to access this list" ]]}, status: 403 
      end
    rescue ActiveRecord::RecordNotFound
      render json: { errors: [ :list => ["does not exist" ]]}, status: 404 
    end

    def add_user
      @list = List.find(params["id"])
      user_to_add = User.find_by(email: params["user"]["email"])
      if !user_to_add
        return render json: { errors: [ "user" => ["can not be found" ]]}, status: 404 
      elsif user_to_add.canAccessList?(@list)
        return render json: { errors: [ "user" => ["Already has access to list" ]]}, status: 422
      elsif !@current_user.ownsList?(@list)
        return render json: { errors: [ :user => ["does not have permision to add users to list" ]]}, status: 403 
      else 
        @list.add_user(user_to_add)
        return render json: ListSerializer.new(@list).serialized_json
      end
    rescue ActiveRecord::RecordNotFound
      render json: { errors: [ "list" => ["does not exist" ]]}, status: 404 
    end

    def create
      list = List.new(name: list_params["name"], deadline: Time.at(list_params["deadline"].to_f / 1000), info: list_params["info"])
      if list.save
        list.add_multiple_users_on_creation(@current_user, User.users_from_emails(list_params["users"]))
        render json: ListSerializer.new(list).serialized_json
      else
        render json: { errors: [list.errors.messages] }, status: 422 
      end
    end

    def destroy
      @list = List.find(params["id"])
      if @list.remove(@current_user)
        #TODO
        #Maybe return a json of something?
      else
        render json: { errors: [ :list => ["does not belong to user" ]]}, status: 403 
      end
    rescue ActiveRecord::RecordNotFound
      render json: { errors: [ :list => ["does not exist" ]]}, status: 404 
    end

    def remove_user
      @list = List.find(params["id"])
      user_to_remove = User.find(params[:user][:id])
      if @list.remove_user!(@current_user, user_to_remove)
        #TODO
      else
        render json: { errors: [ :user => ["could not be removed"]]}, statu: 403
      end
    end

    private 

    def list_params
      params.require(:list).permit(:name, :deadline, :info, :users => [])
    end

  end
end

