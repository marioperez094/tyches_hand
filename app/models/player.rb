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

    #Only discover cards that are not discovered by players
    cards = Card.by_undiscovered(self)

    num_of_cards = weighted_random_card_count(max_cards, health_odds)
    
    #The higher the rank the lower the chance of getting a high card
    rank_weights = ->(card) { 1.5 / (card.card_numeric_rank || 1) }

    #Retrieves a hash table of 
    effect_type_weights = -> (card) { card.effect_type_probability(card.effect_type, health_odds) }

    weights_array = Card.calculate_card_weights(
      cards: cards,
      rank_weights: rank_weights,
      effect_type_weights: effect_type_weights
    )


    discovered_cards = Card.randomize_cards_by_weight(cards, weights_array, num_of_cards)

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
    #The less health the player has the higher the probability they will find more cards
    base_probability = 0.5 + health_odds * 0.3

    #Creates a random number. This is the number of chances player will get a card, if a rand number between 0 and 1 is greater than base_probability
    rand(0..max_cards).times.count { rand < base_probability }
  end
end
