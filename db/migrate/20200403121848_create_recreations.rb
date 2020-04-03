class CreateRecreations < ActiveRecord::Migration[5.2]
  def change
    create_table :recreations do |t|
      t.timestamps
    end
  end
end
