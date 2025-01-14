class Card < ApplicationRecord
  has_many :collections, dependent: :destroy
  has_many :players, through: :collections

  before_validation :set_card_name
  before_validation :set_effect_description

  #Constants
  RANKS = %w[2 3 4 5 6 7 8 9 10 Jack Queen King Ace].freeze
  SUITS = %w[Hearts Diamonds Clubs Spades].freeze
  EFFECTS = %w[Exhumed Charred Fleshwoven Blessed Bloodstained Standard].freeze
  FACE_CARD_RANK = {
    'Jack' => 11,
    'Queen' => 12,
    'King' => 13,
    'Ace' => 15,
  }.freeze
  EFFECT_TYPE_DETAILS = {
    "Exhumed" => {
      value_calculation: ->(rank) { (500 * rank / 15.0).round },
      description: ->(name) { "An #{name}, cards ripped from a corpse's stiff grip. Greater blood pool winnings with a winning hand." },
      probability: ->(health_odds) { (0.4 + health_odds) / 1.4 }
    },
    "Charred" => {
      value_calculation: ->(rank) { (0.15 * rank / 15.0).round(2) },
      description: ->(name) { "A #{name}, the embers on these cards can still cauterize wounds. Reduces blood loss." },
      probability: ->(health_odds) { (0.6 + health_odds) / 2 }
    },
    "Fleshwoven" => {
      value_calculation: ->(rank) { (0.2 * rank / 15.0).round(2) },
      description: ->(name) { "A #{name}, these cards appear to have a leathery texture and an odd familiarity. Greater blood pool winnings if the hand ends in a draw." },
      probability: ->(health_odds) { 0.6 }
    },
    "Blessed" => {
      value_calculation: ->(rank) { (1 + rank / 15.0).round(2) },
      description: ->(name) { "A #{name}, the cards are blinding, and sizzles to the touch. Multiplies wager." },
      probability: ->(health_odds) { 0.5 * (1.5 - health_odds) }
    },
    "Bloodstained" => {
      value_calculation: ->(rank) { (1 + 0.5 * (rank / 15.0)).round(2) },
      description: ->(name) { "A #{name}, the cards are matted together by blood, filling the room with their foul odor. Daimon's minimum wager increases." },
      probability: ->(health_odds) { 0.2 * (1 - health_odds) }
    }
  }.freeze


  #Easily sort cards
  scope :by_suit, ->(suit) { where(suit: suit) }
  scope :by_effect_type, ->(type) { where(effect_type: type) }
  scope :by_undiscovered, ->(player) {where.not(id: player.cards.select(:id))}
  
  validates :description, presence: true

  #Must belongs to one of four suits
  validates :suit, inclusion: { in: SUITS }, presence: true
  validates :name, uniqueness: true, presence: true

  #Must have a rank from 1-10 or J, Q, K, A
  validates :rank, presence: true, inclusion: { in: RANKS }
  validates :effect_type, presence: true, inclusion: { in: EFFECTS } 

  def card_numeric_rank
    FACE_CARD_RANK[rank] || rank.to_i
  end

  def set_card_name
    self.name = "#{effect_type} #{rank} of #{suit}"
  end

  def calculate_effect_value
    EFFECT_TYPE_DETAILS.dig(self.effect_type, :value_calculation)&.call(self.card_numeric_rank) || nil
  end

  def set_effect_description
    self.description = EFFECT_TYPE_DETAILS.dig(self.effect_type, :description)&.call(self.name) || "A #{self.name}"
  end

  
  def effect_type_probability(effect_type, health_odds)
    EFFECT_TYPE_DETAILS.dig(effect_type, :probability)&.call(health_odds) || 0
  end
end