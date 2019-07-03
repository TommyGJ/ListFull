class ListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name 
  has_many :items
  belongs_to :user
end
