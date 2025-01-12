class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name          #Name of card i.e. "Blood Type 7 of Hearts",
      t.string :suit          #Suit of the card
      t.string :value         #Value of the card
      t.string :description   #Card description including effects
      t.string :effect_type   #Category of the effect
      t.string :effect        #A value determining the amount it will affect the effect type

      t.timestamps
    end
  end
end