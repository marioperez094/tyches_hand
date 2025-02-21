class CreatePlayerTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :player_tokens do |t|
      t.belongs_to :player, index: true, foreign_key: { on_delete: :cascade }
      t.belongs_to :token, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
