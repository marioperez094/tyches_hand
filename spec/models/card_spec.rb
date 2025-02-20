require 'rails_helper'

RSpec.describe Card, type: :model do
  describe "Validations" do
    it "is valid with a name, suit, rank, effect, and description" do
      card = FactoryBot.build(:card)
      expect(card).to be_valid
    end

    it "is invalid without a suit" do
      card = FactoryBot.build(:card, suit: nil)
      expect(card).not_to be_valid
    end

    it "is invalid with an incorrect suit" do
      card = FactoryBot.build(:card, suit: "Stars")
      expect(card).not_to be_valid
    end

    it "is invalid without a rank" do
      card = FactoryBot.build(:card, rank: nil)
      expect(card).not_to be_valid
    end

    it "is invalid with an incorrect rank" do
      card = FactoryBot.build(:card, rank: "Joker")
      expect(card).not_to be_valid
    end

    it "is invalid without an effect" do
      card = FactoryBot.build(:card, effect: nil)
      expect(card).not_to be_valid
    end

    it "is invalid with an incorrect effect" do
      card = FactoryBot.build(:card, effect: "Magic")
      expect(card).not_to be_valid
    end

    it "is invalid with an incorrect effect_type" do
      card = FactoryBot.build(:card, effect_type: "Magic") # Invalid type
      expect(card).not_to be_valid
    end

    it "ensures uniqueness of the card name" do
      FactoryBot.create(:card, name: "Exhumed Ace of Spades")
      duplicate_card = FactoryBot.build(:card, name: "Exhumed Ace of Spades")
      expect(duplicate_card).not_to be_valid
    end
  end

  describe "Associations" do
    let(:card) { FactoryBot.create(:card) }
    let(:player) { FactoryBot.create(:player) }
    let(:deck) { player.deck }

    it "can be added to a player's collection" do
      collection = Collection.create!(player: player, card: card)
      expect(player.cards).to include(card)
      expect(card.players).to include(player)
    end

    it "destroys associated collections when deleted" do
      collection = Collection.create!(player: player, card: card)

      expect(Collection.count).to eq(1)
      card.destroy! 

      expect(Collection.count).to eq(0)
    end

    it "can be added to a deck through cards_in_deck" do
      cards_in_deck = CardsInDeck.create!(deck: deck, card: card)

      deck.reload 
      
      expect(deck.cards).to include(card)
      expect(card.decks).to include(deck)
    end

    it "destroys associated cards_in_deck when deleted" do
      cards_in_deck = CardsInDeck.create!(deck: deck, card: card)

      expect(CardsInDeck.count).to eq(1)
      card.destroy
      
      expect(CardsInDeck.count).to eq(0)
    end
  end

  describe "Instance Methods" do
    let(:card) { FactoryBot.create(:card, rank: "Ace", suit: "Spades", effect: "Exhumed") }

    it "card_numeric_rank returns correct value" do
      expect(card.card_numeric_rank).to eq(15)  # Ace should return 15
    end

    it "set_card_name assigns the correct name" do
      card.set_card_name
      expect(card.name).to eq("Exhumed Ace of Spades")
    end

    it "calculate_effect_value returns the correct value" do
      expected_value = (1 + 0.5 * 15 / 15.0).round  # Based on Exhumed effect
      expect(card.calculate_effect_value).to eq(expected_value)
    end

    it "set_effect_description generates the correct description" do
      card.set_effect_description
      expect(card.description).to include("An Exhumed Ace of Spades")
    end

    it "automatically assigns effect_type based on effect" do
      card = FactoryBot.create(:card, effect: "Exhumed")
      expect(card.effect_type).to eq("Pot")
    end
    
    it "assigns 'none' to Standard cards" do
      card = FactoryBot.create(:card, effect: "Standard")
      expect(card.effect_type).to eq("None")
    end
  end

  describe "Scopes" do
    let!(:spade_card) { FactoryBot.create(:card, suit: "Spades") }
    let!(:heart_card) { FactoryBot.create(:card, suit: "Diamonds") }
    let!(:exhumed_card) { FactoryBot.create(:card, effect: "Exhumed") }
    let!(:charred_card) { FactoryBot.create(:card, effect: "Charred") }
    let!(:player) { FactoryBot.create(:player) }
    let!(:player_owned_card) { FactoryBot.create(:card) }
    let!(:pot_card) { FactoryBot.create(:card, effect: "Blessed") } # damage
    let!(:heal_card) { FactoryBot.create(:card, rank: "King", effect: "Charred") } # heal

    before do
      player.cards << player_owned_card
    end

    it ".by_suit returns cards of the given suit" do
      expect(Card.by_suit("Spades")).to include(spade_card)
      expect(Card.by_suit("Spades")).not_to include(heart_card)
    end

    it ".by_effect returns cards with the given effect" do
      expect(Card.by_effect("Exhumed")).to include(exhumed_card)
      expect(Card.by_effect("Exhumed")).not_to include(charred_card)
    end

    it ".by_undiscovered returns cards the player has not discovered" do
      undiscovered_cards = Card.by_undiscovered(player)
      expect(undiscovered_cards).to include(spade_card, heart_card, exhumed_card, charred_card)
      expect(undiscovered_cards).not_to include(player_owned_card)
    end

    it ".by_effect_type returns cards with the given effect type" do
      expect(Card.by_effect_type("Pot")).to include(pot_card)
      expect(Card.by_effect_type("Pot")).not_to include(heal_card)
    
      expect(Card.by_effect_type("Heal")).to include(heal_card)
      expect(Card.by_effect_type("Heal")).not_to include(pot_card)
    end
  end
end