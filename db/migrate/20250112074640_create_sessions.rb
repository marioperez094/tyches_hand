class CreateSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :sessions do |t|
      t.string :token, null: false
      t.references :player, null: false, foreign_key: { on_delete: :cascade }
      t.datetime :expires_at, null: true

      t.timestamps
    end

    add_index :sessions, :token, unique: true
  end
end