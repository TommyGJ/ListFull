class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email

  has_many :lists
  has_many :items
end
