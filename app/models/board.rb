class Board < ApplicationRecord
    has_one_attached :board_image
    has_many :posts
    belongs_to :user

    validates :title, presence: true
    validates :body, presence: true

    def created_at
        attributes['created_at'].strftime("%b %d %Y")
    end

    def user_id
        User.find(attributes['user_id'])
    end
end
