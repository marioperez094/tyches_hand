require 'rails_helper'

RSpec.describe Session, type: :model do
  context '.create' do
    it 'must belong to a player' do
      expect {
        Session.create!
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
    
    it 'should automatically generate a new token' do
      player = FactoryBot.create(:player)
      session = player.sessions.create

      expect(session.token).not_to be_nil
    end
  end
end