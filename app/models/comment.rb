class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :post, :counter_cache => true
    has_many :replies, dependent: :destroy

    def created_at
        attributes['created_at'].strftime("%b %d %Y")
    end
end
