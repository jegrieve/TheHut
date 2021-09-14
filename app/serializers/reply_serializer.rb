class ReplySerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :user
end
