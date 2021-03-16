class User < ApplicationRecord
    validates :email, presence: true
    validates :username, presence: true
    validates :password_digest, presence: true
end
