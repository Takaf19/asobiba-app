class Image < ApplicationRecord
  belongs_to :explanation
  mount_uploader :imgurl, ImageUploader
  validates :imgurl, presence: true
end
