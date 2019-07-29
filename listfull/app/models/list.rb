class List < ApplicationRecord
  has_many :items, dependent: :destroy
  has_many :list_memberships, dependent: :destroy
  has_many :users, :through => :list_memberships 
  validates :name, presence: true, length: { maximum: 20 }
  validates :info, length: { maximum: 100 }
  

  def owner
    list_memberships.ownerships.map(&:user).first
  end

  def owner_id_and_name
    hash = { id: owner&.id, name: "#{owner&.first_name} #{owner&.last_name}" }
  end

  def make_owner!(user)
    membership = list_memberships.where(user_id: user).first
    membership.owner = true
    membership.save
  end

  def add_user(new_user)
      self.users << new_user 
  end

  def remove(current_user)
    if self.owner == current_user
      self.destroy
    elsif current_user.canAccessList?(self) 
      destroy_user_membership(current_user)
    else
      return false
    end
    return true
  end

  def remove_user!(current_user, user)
    return false unless self.owner == current_user
    return false unless user.canAccessList?(self)
    destroy_user_membership(user)
    return true
  end

  def add_multiple_users_on_creation(current_user, new_users)
    return unless new_users
    self.users << current_user
    self.make_owner!(current_user)
    new_users.each { |user| self.users << user }  
  end

  private

  def destroy_user_membership(user)
    membership = list_memberships.where(user_id: user).first
    membership.destroy
  end

end


