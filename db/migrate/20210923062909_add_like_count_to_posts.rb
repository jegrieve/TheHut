class AddLikeCountToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :likes_count, :string
  end
end
