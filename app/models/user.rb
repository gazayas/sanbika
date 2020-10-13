class User < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable, :timeoutable, :omniauthable, omniauth_providers: [:twitter]

  has_many :songs, dependent: :destroy

  # carrierwaveで画像
  mount_uploader :user_image, UserImageUploader

  # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  # validates :name, uniqueness: true, length: { minimum: 5, maximum: 40 }
  # validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  # validates :user_image

  # def email_required?
  #   false
  # end
end
