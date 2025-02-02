require 'rails_helper'

RSpec.describe Deck, type: :model do
  before do
    Card::EFFECTS.each do |effect|
      Card::SUITS.each do |suit|
        Card::RANKS.each do |rank|
          FactoryBot.create(:card, rank: rank, suit: suit, effect: effect)
        end
      end
    end
  end

  context 'create' do
    it 'must belong to a player' do
      expect { 
        FactoryBot.create(:deck) 
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a name less than 15 characters' do
      player = FactoryBot.create(:player)
      deck = player.deck
      expect {
        deck.update!(name: 'c' * 26)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "default name is: username's deck" do
      player = FactoryBot.create(:player)
      deck = player.deck
      expect(deck.name).to eq("#{player.username}'s Deck")
    end

    it 'must have 52 cards' do
      player = FactoryBot.create(:player)
      deck = player.deck
      card = Card.first
      card2 = player.cards.first

      expect(deck.cards.count).to eq(52)
      expect(deck.player.cards.count).to eq(52)
      
      CardsInDeck.delete_all
      Collection.delete_all
      Card.delete_all
    end

    it 'should have many cards' do
      player = FactoryBot.create(:player)
      deck = player.deck
      
      expect(deck.cards.count).to eq(52)
    end
  end
end
