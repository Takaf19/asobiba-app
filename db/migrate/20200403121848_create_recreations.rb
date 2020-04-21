class CreateRecreations < ActiveRecord::Migration[5.2]
  def change
    create_table :recreations do |t|
      t.string      :recname,              null: false
      t.text        :recimage,             null: false
      t.integer     :recimageType,         null: false
      t.text        :recComment,           null: false
      t.integer     :rectime_id,           null: false       
      t.integer     :requirednumber_id,    null: false
      t.references  :user,                 null: false,  foreign_key: true
      t.timestamps
    end
  end
end
