class Card < ApplicationRecord
  has_many :collections, dependent: :destroy
  has_many :players, through: :collections

  before_validation :set_card_name
  before_validation :calculate_effect_value
  before_validation :set_effect_description

  #Constants
  VALUES = %w[2 3 4 5 6 7 8 9 10 Jack Queen King Ace].freeze
  SUITS = %w[Hearts Diamonds Clubs Spades].freeze
  EFFECTS = %w[Exhumed Charred Fleshwoven Blessed Bloodstained Standard].freeze
  FACE_CARD_VALUE = {
    'Jack' => 11,
    'Queen' => 12,
    'King' => 13,
    'Ace' => 15,
  }.freeze

  #Easily sort cards
  scope :by_suit, ->(suit) { where(suit: suit) }
  scope :by_effect_type, ->(type) { where(effect_type: type) }
  
  validates :description, presence: true

  #Must belongs to one of four suits
  validates :suit, inclusion: { in: SUITS }, presence: true
  validates :name, uniqueness: true, presence: true

  #Must have a value from 1-10 or J, Q, K, A
  validates :value, presence: true, inclusion: { in: VALUES }
  validates :effect_type, presence: true, inclusion: { in: EFFECTS }

  private 

  def card_numeric_value
    FACE_CARD_VALUE[value] || value.to_i
  end

  def set_card_name
    self.name = "#{effect_type} #{value} of #{suit}"
  end

  def calculate_effect_value
    self.effect = case effect_type
    when "Exhumed"
      (500 * card_numeric_value / 15.0).round
    when "Charred"
      (0.15 * card_numeric_value / 15.0).round(2)
    when "Fleshwoven" 
      (0.2 * card_numeric_value / 15.0).round(2)
    when "Blessed"
      (1 + card_numeric_value / 15.0).round(2)
    when "Bloodstained" 
      (1 + 0.5 * (card_numeric_value / 15.0)).round(2)
    else 
      nil
    end
  end

  def set_effect_description
    self.description = case effect_type
    when "Exhumed"
      "An #{self.name}, cards ripped from a corpse's stiff grip. Heals #{effect}mL on winning hand."
    when "Charred"
      "A #{self.name}, the embers on these cards can still cauterize wounds. Reduces blood loss by #{effect.to_f * 100}%."
    when "Fleshwoven"
      "A #{self.name}, these cards appear to have a rubbery texture and an odd familiarity. Boosts health by #{effect.to_f * 100}% if the hand ends in a draw."
    when "Blessed"
      "A #{self.name}, the cards are blinding, and burn to the touch. Multiplies wager by #{effect}x."
    when "Bloodstained"
      "A #{self.name}, blood matted cards evoking a putrid stench. Increases daimon's wager by #{effect}x."
    else
      "A #{self.name}"
    end
  end
end