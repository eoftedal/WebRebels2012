class CreateTalks < ActiveRecord::Migration
  def change
    create_table :talks do |t|
      t.string :title
      t.text :description
      t.references :user

      t.timestamps
    end
    add_index :talks, :user_id
  end
end
