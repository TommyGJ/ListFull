module Api::V1
  class ItemsController < ApiController
    before_action :authenticate_token!

    def toggle_complete
      @item = Item.find(params[:id])
      if !@item
        render json: { errors: [ :bullet => ["Can not be found" ]]}, status: 404 
      else
        @item.toggle_complete
        item_json
      end
    end

    def toggle_priority
      @item = Item.find(params[:id])
      if !@item
        render json: { errors: [ :bullet => ["Can not be found" ]]}, status: 404 
      else
        @item.toggle_priority
        item_json
      end
    end

    def create
      @item  = Item.new(item_params)
      if @item.save
        item_json
      else
        render json: { errors: [@item.errors.messages] }, status: 422 
      end
    end

    def destroy
      @item = Item.find(params[:id])
      if @item.remove(@current_user)
        #TODO
      else
        render json: { errors: [ :bullet => ["can only be removed by its creator or the list's creator" ]]}, status: 403 
      end
    rescue ActiveRecord::RecordNotFound
      render json: { errors: [ :bullet => ["does not exist" ]]}, status: 404 
    end

    private 

    def item_json
      render json: ItemSerializer.new(@item).serialized_json
    end

    def item_params
      params.require(:item).permit(:name, :info, :user_id, :list_id)
    end

  end
end

