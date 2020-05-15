class CreateExplanations < ActiveRecord::Migration[5.2]
  def change
    create_table :explanations do |t|
      t.text        :recText,    null: false
      t.string      :imgurl    
      t.references  :recreation, null: false, foreign_key: true
      t.timestamps
    end
  end
end
