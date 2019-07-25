class Item < ApplicationRecord
  belongs_to :user
  belongs_to :list
  validates :name, presence: true, length: { maximum: 20 }
  validates :info, length: { maximum: 100 }

  def owner_name_and_id
    owner = {}
    id = self.user_id
    name = User.find(id).first_name + ' ' + User.find(id).last_name
    owner = { id: id, name: name }
  end

  def toggle_complete
    self.update(complete: !self.complete)
  end

  def toggle_priority
    self.update(priority: !self.priority)
  end
  
end
