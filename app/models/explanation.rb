class Explanation < ApplicationRecord
  belongs_to :recreation

  has_one :image, dependent: :destroy
  accepts_nested_attributes_for :image, allow_destroy: true
end
