class CreateTokenSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :token_slots do |t|
      t.string :slot_type, null: false  # Inscribed, Oathbound, or Offering
      t.references :player, null: false, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
