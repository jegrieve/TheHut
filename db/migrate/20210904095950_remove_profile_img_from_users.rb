class RemoveProfileImgFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :profile_img, :string
  end
end
