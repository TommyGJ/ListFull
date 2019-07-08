class ListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name

  attribute :deadline do |object| 
    "#{object.deadline.to_f * 1000}"
  end

  has_many :items
  belongs_to :user
end
