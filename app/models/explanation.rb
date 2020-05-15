class Explanation < ApplicationRecord
  belongs_to :recreation

  mount_uploader :imgurl, ImageUploader
  validates :recText, length: {maximum: 200}
  validates :recText, presence: true
end
