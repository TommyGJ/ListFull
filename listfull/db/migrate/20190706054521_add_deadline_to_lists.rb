class AddDeadlineToLists < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :deadline, :datetime
  end
end
