require 'rails_helper'

RSpec.describe Card, type: :model do
  context 'create' do
    it 'must have a name' do
      expect {
        FactoryBot.create(:card, name: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

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

    it 'must have a description' do
      expect {
        FactoryBot.create(:card, description: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a valid suit' do
      expect {
        FactoryBot.create(:card, suit: 'Star')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical effect' do
      expect {
        FactoryBot.create(:card, effect: 'X')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a numerical value greater than 0' do
      expect {
        FactoryBot.create(:card, value: -1)
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
  end
end
