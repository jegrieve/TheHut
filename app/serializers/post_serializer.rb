class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :body, :image, :user, :created_at
  
  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image)
      }
    end
  end
end