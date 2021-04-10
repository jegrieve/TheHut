class AddVideoLinkToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :video_link, :string
  end
end
