class Board < ApplicationRecord
    has_one_attached :board_image
    has_many :posts
    belongs_to :user

    validates :title, presence: true
    validates :body, presence: true
end
