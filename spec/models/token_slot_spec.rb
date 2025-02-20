require 'rails_helper'

RSpec.describe TokenSlot, type: :model do
  let(:player) { FactoryBot.create(:player) } # Creates a test player

  describe "Validations" do
    it "allows creating 1 Inscribed slot" do
      token_slot = player.token_slots.where(slot_type: "Inscribed").count
      expect(token_slot).to eq(1)
    end

    it "allows creating up to 2 Oathbound slots" do
      token_slot = player.token_slots.where(slot_type: "Oathbound").count
      expect(token_slot).to eq(2)
    end

    it "allows creating up to 3 Offering slots" do
      token_slot = player.token_slots.where(slot_type: "Offering").count
      expect(token_slot).to eq(3)
    end

    it "prevents creating more than 1 Inscribed slot" do
      extra_slot = player.token_slots.build(slot_type: "Inscribed")
      expect(extra_slot).not_to be_valid
      expect(extra_slot.errors[:slot_type]).to include("Player can only have 1 Inscribed slot.")
    end

    it "prevents creating more than 2 Oathbound slots" do
      extra_slot = player.token_slots.build(slot_type: "Oathbound")
      expect(extra_slot).not_to be_valid
      expect(extra_slot.errors[:slot_type]).to include("Player can only have 2 Oathbound slots.")
    end

    it "prevents creating more than 3 Offering slots" do
      extra_slot = player.token_slots.build(slot_type: "Offering")
      expect(extra_slot).not_to be_valid
      expect(extra_slot.errors[:slot_type]).to include("Player can only have 3 Offering slots.")
    end

    it "requires a valid slot_type" do
      invalid_slot = player.token_slots.build(slot_type: "InvalidSlot")
      expect(invalid_slot).not_to be_valid
      expect(invalid_slot.errors[:slot_type]).to include("is not included in the list")
    end
  end

  describe "Associations" do
    let(:token) { FactoryBot.create(:token) }

    it "belongs to a player" do
      token_slot = player.token_slots.find_by(slot_type: "Inscribed") # Use .find_by instead of .where
      expect(token_slot).not_to be_nil
      expect(token_slot.player).to eq(player)
    end

    it "can have a token assigned to it" do
      token_slot = player.token_slots.find_by(slot_type: "Inscribed")
      token_slot.create_slotted_token!(token: token)

      expect(token_slot.token).to eq(token)
    end
  end
end
