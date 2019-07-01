class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :first_name, :last_name, :email 
  has_many :lists
  has_many :items
end
