class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :first_name, :last_name, :email 
  has_many :items
  has_many :lists
end
