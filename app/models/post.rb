class Post < ApplicationRecord
    has_one_attached :image
    belongs_to :user
    has_many :comments, dependent: :destroy
    belongs_to :board
    has_many :likes, dependent: :destroy
    has_many :liking_users, :through => :likes, :source => :user, dependent: :destroy

    validates :title, presence: true

    def created_at
        attributes['created_at'].strftime("%b %d %Y at %l:%M%P")
    end
    def updated_at
        attributes['updated_at'].strftime("%b %d %Y at %l:%M%P")
    end
end

