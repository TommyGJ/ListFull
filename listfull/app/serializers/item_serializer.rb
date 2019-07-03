class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :info 
  belongs_to :list
  belongs_to :user
end
