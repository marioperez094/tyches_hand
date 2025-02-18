class Player < ApplicationRecord
  #Associations
  has_many :sessions, dependent: :destroy
  has_many :collections, dependent: :destroy
  has_many :cards, through: :collections
  has_one :deck, dependent: :destroy

  #Secure password with bcrypt
  has_secure_password validations: false

  #Validations
  validates :username, presence: true, uniqueness: true, unless: :guest?
  validates :password, confirmation: true, length: { minimum: 6 }, presence: true, on: [:create, :update_password, :convert_to_registered, :destroy], unless: :guest?
  validates :password_confirmation, presence: true, on: [:create, :update_password, :destroy], unless: :guest?
  validates :blood_pool, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5000 }
  validates :lore_progression, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  #Callbacks
  before_validation :assign_guest_username, if: :guest?
  before_destroy :prevent_registered_player_deletion, unless: :force_delete?
  after_create :initialize_deck

  attr_accessor :force_delete #Allows manual deletion when explicitly requested


  #Public Token Functions


  #def current_lore_token
    #Token.where(lore_token: true).order(:sequence_order).offset(lore_progression).first
  #end

  #def advance_lore_progression
    #return unless current_lore_token # Ensure there's a token to advance to
    
    #next_lore_token = Token.where(lore_token: true)
      #.order(:sequence_order)
      #.offset(lore_progression + 1)
      #.first

    #self.lore_progression += 1 if next_lore_token.present?
    #save!
  #end



  #Public Card Functions


  #Card Discovery Logic
  def discover_cards
    max_cards = 10
    max_health = 5000.0
    health_factor = 1 - (blood_pool / max_health) #The lower the health, the higher the discovery rate

    #Retrieves undiscovered cards for the player
    available_cards = Card.by_undiscovered(self)

    #Determines number of cards to be discovered
    num_cards_to_discover = weighted_random_card_count(max_cards, health_factor)
    
    #Weighted probabilyt function for ranking and effect type
    rank_weights = ->(card) { 1.5 / (card.card_numeric_rank || 1) }
    effect_weights = ->(card) { card.effect_probability(card.effect, health_factor) }

    #Calculate probability weights for all available cards
    card_weights = Card.calculate_card_weights(
      cards: available_cards,
      rank_weights: rank_weights,
      effect_weights: effect_weights
    )

    #Assign discovered cards to the player's collection
    discovered_cards = Card.randomize_cards_by_weight(available_cards, card_weights, num_cards_to_discover)

    self.cards << discovered_cards
    
    discovered_cards
  end
  
  #Check if the player already owns a specific card
  def owns_card?(card_id)
    cards.exists?(card_id)
  end

  private

  def guest?
    guest
  end

  #Assign a unique username to gust users
  def assign_guest_username
    update!(username: "Guest#{ Time.now.to_i }") if username.blank?
  end

  def force_delete?
    !!@force_delete # Returns true if explicitly set
  end

  
  #Private Card Functions


  def initialize_deck
    return if deck.present?

    ActiveRecord::Base.transaction do
      created_deck = create_deck!
      created_deck.populate_with_standard_cards
      self.cards << created_deck.cards #Player owns same 52 cards
    end
  end

  #Determine the number of cards a player discovers based on health odds
  def weighted_random_card_count(max_cards, health_factor)
    base_probability = 0.5 + (health_factor * 0.3) #Probabilyt increases with lower health

    # Generate a random number of chances (0 to max_cards), and count successful discoveries
    rand(0..max_cards).times.count { rand < base_probability }
  end

  def prevent_registered_player_deletion
    throw(:abort) unless guest? # Prevent destruction if the player is registered
  end
end
