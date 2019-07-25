class Item < ApplicationRecord
  belongs_to :user
  belongs_to :list

  def owner_name_and_id
    owner = {}
    id = self.user_id
    name = User.find(user_id).first_name + ' ' + User.find(user_id).last_name
    owner = {id: id, name: name}
  end

  def toggle_complete
    self.update(complete: !self.complete)
  end

  def toggle_priority
    self.update(priority: !self.priority)
  end
  
end
