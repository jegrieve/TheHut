class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :post

    def created_at
        attributes['created_at'].strftime("%b %d %Y")
    end
end
