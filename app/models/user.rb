class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :comments
    has_many :boards
    has_many :likes
    has_many :liked_posts, :through => :likes, :source => :post

    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: true
end
