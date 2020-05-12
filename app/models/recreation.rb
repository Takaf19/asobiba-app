class Recreation < ApplicationRecord
  # アクティブハッシュ
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :requirednumber
  belongs_to_active_hash :rectime

  belongs_to :user
  has_many :explanations, dependent: :destroy
  accepts_nested_attributes_for :explanations, allow_destroy: true, update_only: true
  has_many :bookmarks,    dependent: :destroy
  has_many :users,        through: :bookmarks

  mount_uploader :recimage, ImageUploader
  validates :recname, :recimage, :recComment, :rectime_id, :requirednumber_id, presence: true
  validates :recComment, length: {maximum: 200}

  enum recimageType: [ "画像", "動画" ]


  #すでにお気に入り済みか判定
  def bookmark_by?(user)
    bookmarks.where(user_id: user.id).exists?
  end
end
