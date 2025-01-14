require 'rails_helper'

Rails.application.load_tasks

RSpec.describe Deck, type: :model do
  context 'create' do
    it 'must belong to a player' do
      expect { 
        FactoryBot.create(:deck) 
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a name less than 15 characters' do
      player = FactoryBot.create(:player)
      deck = FactoryBot.create(:deck, player: player)
      expect {
        deck.update!(name: 'c' * 16)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "default name is: username's deck" do
      player = FactoryBot.create(:player)
      deck = FactoryBot.create(:deck, player: player)
      expect(deck.name).to eq("#{player.username}'s Deck")
    end

    it 'must have 52 cards' do
      Rake::Task['cards:populate_cards'].invoke
      player = FactoryBot.create(:player)
      deck  = FactoryBot.create(:deck, player: player)
      card = Card.first
      card2 = player.cards.first

      expect(deck.cards.count).to eq(52)
      expect(deck.player.cards.count).to eq(52)

      expect { deck.cards << card }.to raise_error(ActiveRecord::RecordInvalid)
      expect { deck.cards.destroy(card2) }.to raise_error(ActiveRecord::RecordInvalid)
      CardsInDeck.delete_all
      Collection.delete_all
      Card.delete_all
    end

    it 'should have many cards' do
      player = FactoryBot.create(:player)
      deck  = FactoryBot.create(:deck, player: player)
      
      expect(deck.cards).to eq([])
    end
  end
end
