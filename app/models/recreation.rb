class Recreation < ApplicationRecord
  belongs_to :user
  has_many :explanations, dependent: :destroy
  has_many :images,       dependent: :destroy
  has_many :bookmarks,    dependent: :destroy
  has_many :users,        through: :bookmarks, source: :user_id
end
