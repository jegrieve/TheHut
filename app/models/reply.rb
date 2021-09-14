class Reply < ApplicationRecord
    belongs_to :user
    belongs_to :comment

    def created_at
        attributes['created_at'].strftime("%b %d %Y")
    end
end
