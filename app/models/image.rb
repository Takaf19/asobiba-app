class Image < ApplicationRecord
  belongs_to :recreation

  mount_uploader :imgurl, ImageUploader
  validates :imgurl,:imgtype, presence: true
end
