class RemoveUserReferenceFromLists < ActiveRecord::Migration[5.2]
  def change
    change_table :lists do |t|
      t.remove_references :user
    end
  end
end
