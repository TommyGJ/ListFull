class List < ApplicationRecord
  has_many :items, dependent: :destroy
  has_many :list_memberships, dependent: :destroy
  has_many :users, :through => :list_memberships 
  validates :name, presence: true

  def owner
    list_memberships.ownerships.map(&:user).first
  end

  def owner_id_and_name
    hash = { id: owner&.id, name: "#{owner&.first_name} #{owner&.last_name}" }
  end

  def make_owner!(user)
    membership = list_memberships.where(user_id: user).first
    p membership
    membership.owner = true
    membership.save
  end

end


