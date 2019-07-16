class User < ApplicationRecord
  authenticates_with_sorcery!
  has_many :items
  has_many :list_memberships
  has_many :lists, :through => :list_memberships

  validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  validates :email, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates_format_of :email, :with => /\A\S+@.+\.\S+\z/

  def self.users_from_emails(user_emails)
    return unless user_emails
    users = []
    user_emails.each do |email|
      user = User.find_by(email: email)
      if user
        users << user
      end
    end
    users
  end

  def isActive?
    if (self.activation_state == "active")
      return true
    else
      return false
    end
  end

  def ownsList?(list)
    self == list.owner 
  end

  def canAccessList?(list)
    list.users.each do |user|
      if user.id == self.id
        return true
      end
    end
    return false
  end

  def owned_lists
    list_memberships.ownerships.map(&:list)
  end
end
