class Post < ApplicationRecord
    has_one_attached :image
    belongs_to :user
    has_many :comments
    belongs_to :board

    validates :title, presence: true
end

