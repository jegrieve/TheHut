class Board < ApplicationRecord
    has_one_attached :board_image
    has_many :posts

    validates :title, presence: true
    validates :body, presence: true
end
