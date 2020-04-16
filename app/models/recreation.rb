class Recreation < ApplicationRecord
  # アクティブハッシュ
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :requirednumber
  belongs_to_active_hash :rectime

  belongs_to :user
  has_many :explanations, dependent: :destroy
  accepts_nested_attributes_for :explanations, allow_destroy: true
  has_many :images,       dependent: :destroy
  has_many :bookmarks,    dependent: :destroy
  has_many :users,        through: :bookmarks, source: :user_id

  mount_uploader :recimage, ImageUploader
  validates :recname, :recimage, :recComment, :rectime_id, :requirednumber_id, presence: true
  validates :recComment, length: {maximum: 200}
end
