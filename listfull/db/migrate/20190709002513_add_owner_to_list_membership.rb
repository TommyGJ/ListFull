class AddOwnerToListMembership < ActiveRecord::Migration[5.2]
  def change
    add_column :list_memberships, :owner, :boolean
  end
end
