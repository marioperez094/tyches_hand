class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.string :username, unique: true
      t.string :password_digest
      t.boolean :guest, default: false, null: false
      t.boolean :tutorial_complete, default: false, null: false
      t.integer :blood_pool, default: 5000

      t.timestamps
    end

    add_index :players, :username, unique: true
  end
end
