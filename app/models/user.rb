class User < ApplicationRecord
    has_secure_password
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :boards, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :liked_posts, :through => :likes, :source => :post
    has_one_attached :profile_image

    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: true
end
