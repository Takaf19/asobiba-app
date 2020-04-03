class CreateRecreations < ActiveRecord::Migration[5.2]
  def change
    create_table :recreations do |t|
      t.string      :recname,           null: false
      t.text        :recimage,          null: false
      t.integer     :required_number,   null: false
      t.integer     :time,              null: false
      t.references  :user,              null: false,  foreign_key: true
      t.timestamps
    end
  end
end
