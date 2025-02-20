class CreateTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens do |t|
      t.string :name, null: false
      t.string :rune, null: false 
      t.text :description, null: false
      t.string :effect_type, null: false

      #Slot-specific effects
      t.text :inscribed_effect, null: false
      t.text :oathbound_effect, null: false
      t.text :offering_effect, null: false

      #Lore Token Attributes
      t.boolean :lore_token, default: false, null: false
      t.integer :sequence_order, null: true

      t.timestamps
    end

    add_index :tokens, :effect_type
    add_index :tokens, :lore_token
    add_index :tokens, :sequence_order, unique: true, where: "lore_token = true"
  end
end
