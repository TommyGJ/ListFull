class ListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :info

  attribute :deadline do |object| 
    "#{object.deadline.to_f * 1000}"
  end

  attribute :owner_id do |object|
    "#{object.owner_id_and_name[:id]}"
  end

  attribute :owner_name do |object|
    object.owner_id_and_name[:name]
  end

  has_many :items
  has_many :users
end
