class CreateDecks < ActiveRecord::Migration[6.1]
  def change
    create_table :decks do |t|
      t.string :name
      t.belongs_to :player, index: true, foreign_key: true

      t.timestamps
    end
  end
end
