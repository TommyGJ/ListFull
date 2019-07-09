class ListMembership < ApplicationRecord
  belongs_to :user
  belongs_to :list

  scope :ownerships, -> { where(:owner => true) }

  

end
