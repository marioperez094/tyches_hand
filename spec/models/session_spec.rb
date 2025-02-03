require 'rails_helper'

RSpec.describe Session, type: :model do
  let(:player) { FactoryBot.create(:player) }
  let(:guest_player) { FactoryBot.create(:player, username: nil, password: nil, password_confirmation: nil, guest: true) }
  let(:session) { FactoryBot.create(:session, player: player) }

  describe "Associations" do
    it "belongs to a player" do
      session = Session.new(player: player)
      expect(session.player).to eq(player)
    end
  end

  describe "Validations" do
    it "is valid with a player and token" do
      expect(session).to be_valid
    end

    it "is invalid without a player" do
      session.player = nil
      expect(session.valid?).to be false
    end
  end

  describe "Scopes" do
    let!(:active_session) { FactoryBot.create(:session, expires_at: nil, player: player) }
    let!(:future_session) { FactoryBot.create(:session, expires_at: 1.day.from_now, player: player) }
    let!(:expired_session) { FactoryBot.create(:session, expires_at: 1.hour.ago, player: player) }

    it "includes active sessions (no expiration or future expiration)" do
      expect(Session.active).to include(active_session, future_session)
    end

    it "excludes expired sessions" do
      expect(Session.active).not_to include(expired_session)
    end
  end

  describe "Instance Methods" do
    it "#expired? returns true if session is expired" do
      expired_session = FactoryBot.create(:session, expires_at: 1.hour.ago, player: player)
      expect(expired_session.expired?).to be true
    end

    it "#expired? returns false if session is still active" do
      active_session = FactoryBot.create(:session, expires_at: 1.day.from_now, player: player)
      expect(active_session.expired?).to be false
    end
  end

  describe "Callbacks" do
    it "generates a unique token before creation" do
      new_session = FactoryBot.build(:session, token: nil, player: player)
      new_session.save!
      expect(new_session.token).not_to be_nil
    end

    it "ensures tokens are unique" do
      first_session = FactoryBot.create(:session, player: player)
      second_session = FactoryBot.build(:session, token: first_session.token, player: player)

      second_session.valid?
      expect(second_session.errors[:token]).to be_empty # Should generate a unique token
    end

    it "sets expiration if not manually provided" do
      new_session = FactoryBot.create(:session, expires_at: nil, player: player)
      expect(new_session.expires_at).not_to be_nil
    end
  end

  describe "Class Methods" do
    it ".cleanup_expired deletes expired sessions" do
      expired_session = FactoryBot.create(:session, expires_at: 1.hour.ago, player: player)
      active_session = FactoryBot.create(:session, expires_at: 1.day.from_now, player: player)

      Session.cleanup_expired

      expect(Session.count).to eq(1)
    end

    it ".cleanup_expired removes guest players with no sessions" do
      guest_session = FactoryBot.create(:session, player: guest_player, expires_at: 1.hour.ago)

      Session.cleanup_expired

      expect(Player.count).to eq(0)
    end
  end
end
