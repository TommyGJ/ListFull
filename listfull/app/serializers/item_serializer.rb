class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :info, :priority, :complete 

  attribute :owner_id do |object|
    "#{object.owner_name_and_id[:id]}"
    
  end

  attribute :owner_name do |object|
    "#{object.owner_name_and_id[:name]}"
  end

  belongs_to :list
  belongs_to :user
end
