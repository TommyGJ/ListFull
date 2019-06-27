class User < ApplicationRecord
  validates :email,    presence: true
  validates :name,     presence: true
  validates :password, presence:  true, 
                       length: {:within => 6..100}
                      
  has_secure_password
  before_create :confirmation_token
  has_many :lists
  has_many :items

  def to_token_payload
    {
      sub: id,
      email: email,
    }
  end

  def self.from_token_payload(payload)
    self.find(payload(:id))
  end

  def email_activate
    self.email_confirmed = true
    self.confirm_token = nil
    save!(:validate => false)
  end


  private
  def confirmation_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end
end
