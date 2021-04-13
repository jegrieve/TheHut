class BoardSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :body, :board_image, :user_id, :created_at
  
  def board_image
    if object.board_image.attached?
      {
        url: rails_blob_url(object.board_image)
      }
    end
  end
end
