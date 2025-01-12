require 'rails_helper'

RSpec.describe  Player, type: :model do
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
  end
end