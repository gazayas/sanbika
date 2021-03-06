class Song < ApplicationRecord
	belongs_to :user
	has_many :set_list_songs, dependent: :destroy
	has_many :favorites, dependent: :destroy

	VIDEO_REGEXP = /\A(http)?(s)?(:\/\/)?(www\.youtube\.com\/watch\?(time_continue=\d+\&)?(v=))|(youtu\.be\/)(.*)\z/

	validates :title, presence: true, length: { maximum: 50 }, uniqueness: { scope: :user_id }
	validates :key, presence: true, length: { maximum: 2 }
	validates :song_body, presence: true, length: { maximum: 7_000_000 }
	validates :video, :check_link, length: { maximum: 300 }

	# TODO: Change the Regular Expression so it matches with upcase/downcase
	# Returns all instances if there are no search hits.
	def self.search(search)
		if search
			where(['title LIKE ?', "%#{search}%"])
    else
			all
		end
	end

	private

	# TODO: There is also "format" in Rails validations.
	# Check and see if that is a better option
	def check_link
		errors.add(:video, I18n.t(:invalid_link)) unless video == "" || !!video.match(VIDEO_REGEXP)
	end

	def self.favorites
		Favorite.where(song_id: self.id)
	end
end
