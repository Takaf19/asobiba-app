class Explanation < ApplicationRecord
  belongs_to :recreation

  validates :text, presence: true
end
