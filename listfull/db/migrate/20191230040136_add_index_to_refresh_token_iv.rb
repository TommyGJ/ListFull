class AddIndexToRefreshTokenIv < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :encrypted_refresh_token_iv, unique: true
  end
end
