class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name, null: false         #Name of card i.e. "Blood Type 7 of Hearts",
      t.string :suit, null: false          #Suit of the card
      t.string :rank, null: false          #Value of the card
      t.string :description, null: false   #Card description including effects
      t.string :effect, null: false   #Category of the effect

      t.timestamps
    end

     # Indexes to improve query performance
     add_index :cards, :suit
     add_index :cards, :rank
     add_index :cards, :effect
  end
end