class AddDefaultValueToOwnerAttribute < ActiveRecord::Migration[5.2]
  def change
    change_column :list_memberships, :owner, :boolean, default: false
  end
end
