class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :email, :bio, :created_at, :profile_image, :posts, :comments, :boards, :liked_posts

  def profile_image
    if object.profile_image.attached?
      {
        url: rails_blob_url(object.profile_image)
      }
    end
  end
end
