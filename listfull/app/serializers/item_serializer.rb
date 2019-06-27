class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :info

  belongs_to :list
  belongs_to :user
end
