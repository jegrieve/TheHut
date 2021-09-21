class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  has_many :comments, :serializer => CommentSerializer
  attributes :id, :username, :email, :bio, :created_at, :profile_image, :posts, :comments, :boards, :liked_posts

  def profile_image
    if object.profile_image.attached?
      {
        url: rails_blob_url(object.profile_image)
      }
    end
  end
  def posts
    posts = Post.where(user_id: object.id).order(created_at: :desc)
  end
  def comments
    comments = Comment.where(user_id: object.id).order(created_at: :desc)
  end
end
