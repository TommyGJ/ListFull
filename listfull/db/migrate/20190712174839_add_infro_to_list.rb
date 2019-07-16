class AddInfroToList < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :info, :text
  end
end
