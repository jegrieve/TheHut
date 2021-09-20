class CommentSerializer < ActiveModel::Serializer
  belongs_to :user, :serializer => UserSerializer
  attributes :id, :body, :user, :created_at, :replies
end
