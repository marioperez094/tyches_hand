require 'rails_helper'

RSpec.describe  Player, type: :model do
  before do
    Card::EFFECTS.each do |effect_type|
      Card::SUITS.each do |suit|
        Card::RANKS.each do |rank|
          FactoryBot.create(:card, rank: rank, suit: suit, effect_type: effect_type)
        end
      end
    end
  end

  context 'create' do
    it 'if guest = false, it must have a username' do
      expect {
        FactoryBot.create(:player, username: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'if guest = false, it must have a password' do
      expect {
        FactoryBot.create(:player, password: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'if guest = false, it must have a password_confirmation' do
      expect {
        FactoryBot.create(:player, password_confirmation: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
    
    it 'if guest = false, password and password_confirmation must match' do
      expect {
        FactoryBot.create(:player, password_confirmation: "abcdefg")
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'if guest = true, it can have no username' do
      expect {
        FactoryBot.create(:player, username: nil, guest: true)
      }.not_to raise_error
    end

    it 'if guest = true, it can have no password' do
      expect {
        FactoryBot.create(:player, password: nil, guest: true)
      }.not_to raise_error
    end

    it 'if guest = true, username is a guest username' do
      guest_player = FactoryBot.create(:player, username: nil, password: nil, guest: true)
      expect(guest_player.username).to eq("Guest#{Time.now.to_i}")
    end

    it 'does not overwrite an existing username' do
      player = FactoryBot.create(:player)

      expect(player.username).to eq('Test')
    end
    
    it 'it must have a blood_pool of 5000' do
      player = FactoryBot.create(:player)

      expect(player.blood_pool).to eq(5000)
    end

    it 'it must have a blood_pool' do
      expect {
        FactoryBot.create(:player, blood_pool: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
    
    it 'it must have guest' do
      expect {
        FactoryBot.create(:player, blood_pool: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
    
    it 'it must have a blood_pool > 0' do
      expect {
        FactoryBot.create(:player, blood_pool: -1)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'it must have a blood_pool < 5000' do
      expect {
        FactoryBot.create(:player, blood_pool: 5001)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'should have many sessions' do
      player = FactoryBot.create(:player)
      expect(player.sessions).to eq([])
    end

    it 'should have many collections' do
      player = FactoryBot.create(:player)
      expect(player.collections).to eq([])
    end

    it 'should have many cards' do 
      player = FactoryBot.create(:player)
      expect(player.cards).to eq([])
    end

    it 'has a better chance to discover cards with lower blood_pool' do
      player1 = FactoryBot.create(:player)
      player2 = FactoryBot.create(:player, username: 'Test2')
      player2.blood_pool = 2000
      deck = FactoryBot.create(:deck, player: player1)
      deck2 = FactoryBot.create(:deck, player: player2)

      expect(player1.deck).to eq(deck)

      player1.discover_cards
      player2.discover_cards

      expect(Card.count).to eq(312)
      expect(player1.cards.count).to be <= player2.cards.count
      CardsInDeck.delete_all
      Collection.delete_all
      Card.delete_all
    end
  end
end