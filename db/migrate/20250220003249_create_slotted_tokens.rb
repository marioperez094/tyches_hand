class CreateSlottedTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :slotted_tokens do |t|
      t.belongs_to :token, index: true, foreign_key: { on_delete: :cascade }
      t.belongs_to :token_slot, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end

    add_index :slotted_tokens, [:token_id, :token_slot_id], unique: true
  end
end
