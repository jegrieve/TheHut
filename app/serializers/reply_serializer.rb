class ReplySerializer < ActiveModel::Serializer
  belongs_to :user, :serializer => UserSerializer
  attributes :id, :body, :created_at, :user
end
