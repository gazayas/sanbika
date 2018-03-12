class Song < ApplicationRecord
	before_save :prep_yomikata
	before_update :prep_yomikata

	belongs_to :user

	# TODO: Hopeのレポジトリにも実装する事
	VIDEO_REGEXP = /\A(http)?(s)?(:\/\/)?(www\.youtube\.com\/watch\?v=)|(youtu\.be\/)(.*)\z/

  validates :title, presence: true, length: { maximum: 50 }
  validates :title_yomikata, presence: true, length: { maximum: 70 }
	validates :artist, length: { maximum: 50 }
	validates :artist_yomikata, length: { maximum: 70 }
	validates :key, presence: true, length: { maximum: 2 }
  validates :song_body, presence: true, length: { maximum: 7_000_000 }
	validates :video, length: { maximum: 300 }, format: { with: VIDEO_REGEXP }

	private

	def prep_yomikata
		moji = Nihonjin::Moji.new

		prep = Proc.new do |str|
			str = moji.hiragana(str)
			str = moji.kiru(str)
		end

		self.title_yomikata = prep.call(self.title_yomikata)
		self.artist_yomikata = prep.call(self.artist_yomikata)

		self
	end
end
