require 'rails_helper'

RSpec.describe Card, type: :model do
  context 'create' do
    it 'must have a suit' do
      expect {
        FactoryBot.create(:card, suit: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a value' do
      expect {
        FactoryBot.create(:card, value: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a valid suit' do
      expect {
        FactoryBot.create(:card, suit: 'Star')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a valid effect_type' do
      expect {
        FactoryBot.create(:card, effect_type: 'Flower')
      }.to raise_error(ActiveRecord::RecordInvalid) 
    end

    it 'must have a numerical value greater than 1' do
      expect {
        FactoryBot.create(:card, value: 1)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical value less than 10' do
      expect {
        FactoryBot.create(:card, value: 11)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a value that is J, Q, or K' do
      expect {
        FactoryBot.create(:card, value: 'F')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must be unique' do
      expect {
        FactoryBot.create(:card)
        FactoryBot.create(:card)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'returns card by given suit' do
      hearts_card = FactoryBot.create(:card)
      spades_card = FactoryBot.create(:card, value: '3', suit: "Spades")
      spades_card2 = FactoryBot.create(:card, suit: "Spades")
      diamond_card = FactoryBot.create(:card, suit: "Diamonds")
      clubs_card = FactoryBot.create(:card, suit: "Clubs")

      expect(Card.by_suit("Hearts")).to contain_exactly(hearts_card)
    end

    it 'should have many collections' do
      card = FactoryBot.create(:card)
      expect(card.players).to eq([])
    end

    it 'should have many players' do 
      card = FactoryBot.create(:card)
      expect(card.players).to eq([])
    end

    it 'should calculate an exhumed card' do
      card = FactoryBot.create(:card, value: 'King', effect_type: 'Exhumed')
      expect(card.effect).to eq('433')
      expect(card.name).to eq('Exhumed King of Hearts')
      expect(card.description).to eq("An #{card.name}, cards ripped from a corpse's stiff grip. Heals 433mL on winning hand.")
    end

    it 'should calculate a charred card' do
      card = FactoryBot.create(:card, value: 'Queen', effect_type: 'Charred')
      expect(card.effect).to eq('0.12')
      expect(card.name).to eq('Charred Queen of Hearts')
      expect(card.description).to eq("A #{card.name}, the embers on these cards can still cauterize wounds. Reduces blood loss by 12.0%.")
    end

    it 'should calculate a fleshwoven card' do
      card = FactoryBot.create(:card, value: 'Jack', effect_type: 'Fleshwoven')
      expect(card.effect).to eq('0.15')
      expect(card.name).to eq('Fleshwoven Jack of Hearts')
      expect(card.description).to eq("A #{card.name}, these cards appear to have a rubbery texture and an odd familiarity. Boosts health by 15.0% if the hand ends in a draw.")
    end

    it 'should calculate a blessed card' do
      card = FactoryBot.create(:card, value: '9', effect_type: 'Blessed')
      expect(card.effect).to eq('1.6')
      expect(card.name).to eq('Blessed 9 of Hearts')
      expect(card.description).to eq("A #{card.name}, the cards are blinding, and burn to the touch. Multiplies wager by 1.6x.")
    end

    it 'should calculate a bloodstained card' do
      card = FactoryBot.create(:card, value: 'Ace', effect_type: 'Bloodstained')
      expect(card.effect).to eq('1.5')
      expect(card.name).to eq('Bloodstained Ace of Hearts')
      expect(card.description).to eq("A #{card.name}, blood matted cards evoking a putrid stench. Increases daimon's wager by 1.5x.")
    end

    it 'should not have an effect if standard card' do
      card = FactoryBot.create(:card, value: 'Ace', effect_type: 'Standard')
      expect(card.effect).to eq(nil)
      expect(card.name).to eq('Standard Ace of Hearts')
      expect(card.description).to eq('A Standard Ace of Hearts')
    end
  end
end