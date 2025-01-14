class Player < ApplicationRecord
  has_many :sessions, dependent: :destroy
  has_many :collections, dependent: :destroy
  has_many :cards, through: :collections
  has_one :deck

  has_secure_password validations: false

  #Validations
  validates :username, presence: true, uniqueness: true, unless: :guest?
  validates :password, presence: true, length: { minimum: 6 }, unless: :guest?
  validates :blood_pool, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5000 }

  after_create :assign_guest_username, if: :guest?

  def discover_cards
    max_cards = 10
    max_player_health = 5000.0
    health_odds = 1 - (self.blood_pool / max_player_health)
    cards = Card.by_undiscovered(self)

    
    num_of_cards = weighted_random_card_count(max_cards, health_odds)
    weights = calculate_card_weights(cards, health_odds)

    discovered_cards = discover_random_cards(cards, weights, num_of_cards)

    self.cards << discovered_cards
    
    discovered_cards
  end

  private

  def guest?
    guest
  end

  def assign_guest_username
    timestamp = Time.now.to_i
    update!(username: "Guest#{timestamp}") if username.blank?
  end

  def weighted_random_card_count(max_cards, health_odds)
    base_probability = 0.5 + health_odds * 0.3
    rand(0..max_cards).times.count { rand < base_probability }
  end

  def calculate_card_weights(cards, health_odds)
    cards.map do |card|
      rank_weight = 1.5 / (card.card_numeric_rank || 1)
      effect_type_weight = card.effect_type_probability(card.effect_type, health_odds)
      rank_weight * effect_type_weight
    end
  end

  
  def discover_random_cards(cards, weights, count)
    raise ArgumentError, "Cards and weights size must match" unless cards.size == weights.size 

    cumulative_weights = []
    weights.each_with_index do |weight, index|
      cumulative_weights[index] = weight + (cumulative_weights[index - 1] || 0)
    end

    total_weight = cumulative_weights.last

    Array.new(count) do
      random = rand * total_weight
      cards[cumulative_weights.index { |w| w > random}]
    end
  end
end
