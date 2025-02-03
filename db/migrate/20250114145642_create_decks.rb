class CreateDecks < ActiveRecord::Migration[6.1]
  def change
    create_table :decks do |t|
      t.string :name, null: false
      t.references :player, null: false, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
