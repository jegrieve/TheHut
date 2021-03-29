class AddBoardRefToPosts < ActiveRecord::Migration[6.1]
  def change
    add_reference :posts, :board, null: false, foreign_key: true
  end
end
