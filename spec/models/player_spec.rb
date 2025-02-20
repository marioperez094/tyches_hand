require 'rails_helper'

RSpec.describe  Player, type: :model do
  before do
    Card::EFFECTS.each do |effect|
      Card::SUITS.each do |suit|
        Card::RANKS.each do |rank|
          FactoryBot.create(:card, rank: rank, suit: suit, effect: effect)
        end
      end
    end
  end

  describe "Validations" do
    it 'is valid with a username and password' do
      player = FactoryBot.build(:player, password: "securepass", password_confirmation: "securepass")
      expect(player).to be_valid
    end

    it "is invalid without a username (unless guest)" do
      player = FactoryBot.build(:player, username: nil, guest: false)
      expect(player).not_to be_valid
    end

    it "is invalid with a non-unique username" do
      FactoryBot.create(:player, username: "duplicate_user")
      duplicate_player = FactoryBot.build(:player, username: "duplicate_user")
      expect(duplicate_player).not_to be_valid
    end

    it "is valid without a username if guest is true" do
      player = FactoryBot.build(:player, username: nil, guest: true)
      expect(player).to be_valid
    end

    it "validates password length (min 6) unless guest" do
      player = FactoryBot.build(:player, password: "short", password_confirmation: "short", guest: false)
      expect(player).not_to be_valid
    end

    it "allows blank password if guest" do
      player = FactoryBot.build(:player, password: nil, password_confirmation: nil, guest: true)
      expect(player).to be_valid
    end

    it "validates blood_pool within range (0-5000)" do
      valid_player = FactoryBot.build(:player, blood_pool: 2500)
      invalid_player = FactoryBot.build(:player, blood_pool: 6000)

      expect(valid_player).to be_valid
      expect(invalid_player).not_to be_valid
    end
  end 

  describe "Associations" do
    let(:token) { FactoryBot.create(:token) }
    let(:player) { FactoryBot.create(:player) }
    let(:deck) { player.deck }

    it "has many sessions" do
      session1 = FactoryBot.create(:session, player: player)
      session2 = FactoryBot.create(:session, player: player)

      expect(player.sessions).to include(session1, session2)
    end

    it "deletes associated sessions when destroyed" do
      session = FactoryBot.create(:session, player: player)

      expect(Session.count).to eq(1)

      player.force_delete = true
      player.destroy!

      expect(Player.count).to eq(0)
      expect(Session.count).to eq(0)
    end

    it "has many cards through collections" do
      card1 = Card.first
      card2 = Card.second
      player.cards << [card1, card2]

      expect(player.cards).to include(card1, card2)
    end

    it "deletes associated collection when destroyed" do
      card = Card.first
      collection = Collection.create!(player: player, card: card)
      
      expect(Collection.count).to eq(53)

      player.force_delete = true
      player.destroy!

      expect(Player.count).to eq(0)
      expect(Collection.count).to eq(0)
    end

    it "has a deck" do
      expect(player.deck.name).to eq("Test's Deck")
      expect(Deck.count).to eq(1)
      
      player.force_delete = true
      player.destroy!

      expect(Player.count).to eq(0)
      expect(Deck.count).to eq(0)
    end

    it "deletes associated deck when destroyed" do
      expect(player.deck.name).to eq("Test's Deck")
      expect(Deck.count).to eq(1)

      player.force_delete = true
      player.destroy!

      expect(Player.count).to eq(0)
      expect(Deck.count).to eq(0)
    end

    it "has many tokens through player_token" do
      player = FactoryBot.create(:player)
      token = FactoryBot.create(:token)
      player.tokens << token

      expect(player.tokens).to include(token)
    end

    it "deletes associated collection when destroyed" do
      player_token = PlayerToken.create!(player: player, token: token)
      
      expect(PlayerToken.count).to eq(1)

      player.force_delete = true
      player.destroy!

      expect(Player.count).to eq(0)
      expect(PlayerToken.count).to eq(0)
    end

    it "has one deck" do
      player = FactoryBot.create(:player)
      deck = player.deck

      expect(player.deck).to eq(deck)
    end
  end

  describe "Callbacks" do
    it "assigns a guest username if guest and username is blank" do
      player = FactoryBot.create(:player, username: nil, guest: true)
      expect(player.username).to match(/^Guest\d+$/)
    end

    it "prevents registered player deletion unless force_delete is set" do
      player = FactoryBot.create(:player, guest: false)
      session = FactoryBot.create(:session, player: player)

      expect { player.destroy }.not_to change(Player, :count)
      
      player.force_delete = true
      expect { player.destroy! }.to change(Player, :count).by(-1)
    end
  end

  describe "initialize_deck" do
    it "creates a deck if the player does not have one" do
      player = FactoryBot.create(:player)
      expect(player.deck).not_to be_nil
      expect(player.deck.cards.count).to eq(52)
    end
  end

  describe "#owns_card?" do
    let(:player) { FactoryBot.create(:player) }
    let(:card) { Card.first }

    it "returns true if the player owns the card" do
      player.cards << card
      expect(player.owns_card?(card.id)).to be true
    end

    it "returns false if the player does not own the card" do
      expect(player.owns_card?(card.id)).to be false
    end
  end

  describe "#owns_token?" do
    let(:player) { FactoryBot.create(:player) }
    let(:token) { FactoryBot.create(:token) }

    it "returns true if the player owns the card" do
      player.tokens << token
      expect(player.owns_token?(token.id)).to be true
    end

    it "returns false if the player does not own the card" do
      expect(player.owns_token?(token.id)).to be false
    end
  end

  describe "discover_cards" do
    let(:player) { FactoryBot.create(:player) }

    it "assigns newly discovered cards to the player" do
      expect {
        discovered_cards = player.discover_cards
        expect(discovered_cards).not_to be_empty
        expect(player.cards).to include(*discovered_cards)
      }.to change { player.cards.count }.by_at_most(10)
    end

    it "increases discovery rate when health is low" do
      low_health_player = FactoryBot.create(:player, username: 'low_health_player', blood_pool: 500) # Near death
      discoveries = 10.times.map { low_health_player.discover_cards.count > player.discover_cards.count }
      expect(discoveries.count(true)).to be > 5  # Expect at least 6 out of 10 runs to hold true
    end

    it "does not discover more than 10 cards in one attempt" do
      expect(player.discover_cards.count).to be <= 10
    end
  end
end