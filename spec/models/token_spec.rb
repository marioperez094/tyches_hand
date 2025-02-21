require 'rails_helper'

RSpec.describe Token, type: :model do
  describe "Validations" do
    it "is valid with a name, effect type, slot effects, and correct lore sequence" do
      token = FactoryBot.build(:token, lore_token: false, sequence_order: nil)
      expect(token).to be_valid
    end

    it "is invalid without a name" do
      token = FactoryBot.build(:token, name: nil)
      expect(token).not_to be_valid
    end

    it "requires a unique name" do
      FactoryBot.create(:token, name: "Eye of Tyche")
      duplicate_token = FactoryBot.build(:token, name: "Eye of Tyche", sequence_order: 2)
      expect(duplicate_token).not_to be_valid
    end

    it "requires an effect type from the EFFECT_TYPES list" do
      valid_token = FactoryBot.build(:token, effect_type: "Damage")
      invalid_token = FactoryBot.build(:token, effect_type: "InvalidType")

      expect(valid_token).to be_valid
      expect(invalid_token).not_to be_valid
    end

    it "requires inscribed, oathbound, and offering effects to be present" do
      token = FactoryBot.build(:token, inscribed_effect: nil)
      expect(token).not_to be_valid
    end

    it "ensures lore tokens have a sequence order" do
      token = FactoryBot.build(:token, lore_token: true, sequence_order: nil)
      expect(token).not_to be_valid
    end

    it "ensures non-lore tokens do not have a sequence order" do
      token = FactoryBot.build(:token, lore_token: false, sequence_order: 1)
      expect(token).not_to be_valid
    end

    it "ensures sequence_order is unique among lore tokens" do
      FactoryBot.create(:token, lore_token: true, sequence_order: 1)
      duplicate_sequence = FactoryBot.build(:token, name: 'Ear of Tyche', lore_token: true, sequence_order: 1)

      expect(duplicate_sequence).not_to be_valid
    end
  end
  
  describe "Associations" do
    let (:token) { FactoryBot.create(:token) }
    let(:player) { FactoryBot.create(:player) }

    it "can be added to a player's token collection" do
      player_token = PlayerToken.create!(player: player, token: token)
      expect(player.tokens).to include(token)
      expect(token.players).to include(player)
    end

    it "destroys associated collections when deleted" do
      player_token = PlayerToken.create!(player: player, token: token)

      expect(PlayerToken.count).to eq(1)
      token.destroy!

      expect(PlayerToken.count).to eq(0)
    end
  end

  describe "Scopes" do
    let!(:lore_token_1) { FactoryBot.create(:token, lore_token: true, sequence_order: 0) }
    let!(:lore_token_2) { FactoryBot.create(:token, name: 'Ear of Tyche', rune: 'I', lore_token: true, sequence_order: 1) }
    let!(:damage_token) { FactoryBot.create(:token, name: 'Damage of Tyche', rune: 'F', effect_type: "Damage") }
    let!(:healing_token) { FactoryBot.create(:token, name: 'Heal of Tyche', rune: 'S', effect_type: "Heal") }

    it ".lore_tokens returns only lore tokens in order" do
      expect(Token.lore_tokens).to eq([lore_token_1, lore_token_2])
    end

    it ".by_effect_type returns tokens of the correct effect type" do
      expect(Token.by_effect_type("Damage")).to include(damage_token)
      expect(Token.by_effect_type("Damage")).not_to include(healing_token)
    end
  end

  describe "Class Methods" do
    let!(:lore_token_1) { FactoryBot.create(:token, lore_token: true, sequence_order: 0) }
    let!(:lore_token_2) { FactoryBot.create(:token, name: 'Ear of Tyche', rune: 'I', lore_token: true, sequence_order: 1) }

    it ".next_lore_token returns the next lore token based on progression" do
      expect(Token.next_lore_token(0)).to eq(lore_token_1)
      expect(Token.next_lore_token(1)).to eq(lore_token_2)
    end

    it ".next_lore_token returns nil if no lore token is left" do
      expect(Token.next_lore_token(2)).to be_nil
    end
  end
end