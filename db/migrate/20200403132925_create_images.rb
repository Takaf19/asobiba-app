class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.text        :imgurl,           null: false
      t.string      :imgtype,          null: false
      t.references  :recreation, null: false, foreign_key: true
      t.timestamps
    end
  end
end
