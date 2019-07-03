class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :items
  has_many :lists

  validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  validates :email, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates_format_of :email, :with => /\A\S+@.+\.\S+\z/

  def isActive?
    if (self.activation_state == "active")
      return true
    else
      return false
    end
  end

  def ownsList?(list)
    if (list.user_id == self.id)
      return true
    else
      return false
    end
  end


end
