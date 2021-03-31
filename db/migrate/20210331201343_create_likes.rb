class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes do |t|
      add_reference :posts, :board, null: false, foreign_key: true
      add_reference :users, :board, null: false, foreign_key: true

      t.timestamps
    end
  end
end
