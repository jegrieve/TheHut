class Post < ApplicationRecord
    has_one_attached :image
    belongs_to :user
    has_many :comments
    belongs_to :board
    has_many :likes
    has_many :liking_users, :through => :likes, :source => :user 

    validates :title, presence: true
end

