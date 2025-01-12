class CreateSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :sessions do |t|
      t.string :token
      t.belongs_to :player, index: true, foreign_key: true

      t.timestamps
    end

    add_index :sessions, :token, unique: true
  end
end