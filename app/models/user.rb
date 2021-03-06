class User < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  attr_accessor :login

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :confirmable, :lockable, :timeoutable,
         :omniauthable, omniauth_providers: [:facebook, :twitter, :google_oauth2],
         :authentication_keys => [:login]

  has_many :songs, dependent: :destroy
  has_many :set_lists, dependent: :destroy
  has_many :set_list_songs, through: :set_lists, dependent: :destroy
  has_many :favorites, through: :songs, dependent: :destroy
  accepts_nested_attributes_for :favorites

  # TODO: Use carrierwave to edit user images
  # mount_uploader :user_image, UserImageUploader

  # TODO: Test multiple blank email users,
  # We allow blank here because oauth doesn't save the user's email to the database.
  validates :email, presence: true, email: true, unless: :omniauth_user?
  validates :username, presence: true, length: { minimum: 5, maximum: 30 }, unless: :omniauth_user?
  validates :password, presence: true, length: { minimum: 6, maximum: 30 }, unless: :omniauth_user?, if: :password_required?

  def self.from_omniauth(auth)
    find_or_create_by(provider: auth["provider"], uid: auth["uid"]) do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]

      # The sub logic for the images helps display the size you choose
      # TODO: Add a thumbnail column to the users and save small pictures to that attribute
      if auth["provider"] == "twitter"
        user.username = auth["info"]["nickname"]
        user.user_image = auth["info"]["image"].sub("_normal", "")
      elsif auth["provider"] == "facebook"
        user.username = auth["info"]["name"]
        user.user_image = auth["info"]["image"] + "&type=large"
      elsif auth["provider"] == "google_oauth2"
        user.username = auth["info"]["name"]
        user.user_image = auth["info"]["image"].sub(/=s\d+/, "=s300")
      end
    end
  end

  def omniauth_user?
    self.provider.present?
  end

  def self.new_with_session(params, session)
    if session["devise.user_attributes"]
      new(session["devise.user_attributes"]) do |user|
        user.attributes = params
      end
    else
      super
    end
  end

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["username = :value OR lower(email) = lower(:value)", { :value => login }]).first
    else
      where(condition).first
    end
  end

  # Since :validatable has been removed, we don't need password validation when
  # updating the user's information on user#edit view. This method allows us to skip the validation.
  def password_required?
    !persisted? || !password.nil? || !password_confirmation.nil?
  end
end
