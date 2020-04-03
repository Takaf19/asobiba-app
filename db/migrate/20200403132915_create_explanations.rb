class CreateExplanations < ActiveRecord::Migration[5.2]
  def change
    create_table :explanations do |t|
      t.text        :text,       null: false
      t.references  :recreation, null: false, foreign_key: true
      t.timestamps
    end
  end
end
