class CreateCardsInDecks < ActiveRecord::Migration[6.1]
  def change
    create_table :cards_in_decks do |t|
      t.belongs_to :card, index: true, foreign_key: { on_delete: :cascade }
      t.belongs_to :deck, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end

    add_index :cards_in_decks, [:card_id, :deck_id], unique: true
  end
end
