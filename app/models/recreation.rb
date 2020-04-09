class Recreation < ApplicationRecord
  belongs_to :user
  has_many :explanations, dependent: :destroy
  accepts_nested_attributes_for :explanations, allow_destroy: true
  has_many :images,       dependent: :destroy
  has_many :bookmarks,    dependent: :destroy
  has_many :users,        through: :bookmarks, source: :user_id

  mount_uploader :recimage, ImageUploader
  validates :recname, :recimage, :required_number, :time, presence: true
end
