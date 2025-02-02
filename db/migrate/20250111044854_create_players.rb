class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.string :username, null: false
      t.string :password_digest
      t.boolean :guest, default: false, null: false
      t.boolean :tutorial_complete, default: false, null: false
      t.integer :blood_pool, default: 5000, null: false
      t.integer :high_score, default: 0, null: false
      t.integer :high_score_round, default: 0, null: false

      t.timestamps
    end

    add_index :players, :username, unique: true
  end
end
