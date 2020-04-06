class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :recreation

  validates :user_id, uniqueness: { scope: :recreation_id } 
end
