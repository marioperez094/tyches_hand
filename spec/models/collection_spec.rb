require 'rails_helper'

RSpec.describe Collection, type: :model do
  context 'create' do
    it 'must belong to a player' do
      expect {
        player = nil
        card = FactoryBot.create(:card)
        player.cards << card
    }.to raise_error
    end

    it 'must belong to a card' do
      expect {
        player = FactoryBot.create(:player)
        card = nil
        player.cards << card
      }.to raise_error
    end

    it 'does not raise an error' do
      expect {
        player = FactoryBot.create(:player)
        card = FactoryBot.create(:card)
        player.cards << card
    }.not_to raise_error
    end
  end
end
