class CreateCollections < ActiveRecord::Migration[6.1]
  def change
    create_table :collections do |t|
      t.belongs_to :player, index: true, foreign_key: true
      t.belongs_to :card, index: true, foreign_key: true

      t.timestamps
    end

    add_index :collections, [:player_id, :card_id], unique: true
  end
end
