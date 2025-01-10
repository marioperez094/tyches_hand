class Card < ApplicationRecord

  #Constants
  VALUES = %w[1 2 3 4 5 6 7 8 9 10 Jack Queen King Ace].freeze
  SUITS = %w[Hearts Diamonds Clubs Spades].freeze

  #Easily sort cards
  scope :by_suit, ->(suit) { where(suit: suit) }
  scope :by_effect_type, ->(type) { where(effect_type: type) }
  
  validates :description, presence: true

  #Must belongs to one of four suits
  validates :suit, inclusion: { in: SUITS }, presence: true
  validates :name, uniqueness: true, presence: true

  #Must have a value from 1-10 or J, Q, K, A
  validates :value, presence: true, inclusion: { in: VALUES }, presence: true
  validates :effect, numericality: true
end
