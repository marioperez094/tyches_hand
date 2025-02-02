class Deck < ApplicationRecord
  #Associations
  belongs_to :player

  has_many :cards_in_deck, dependent: :destroy
  has_many :cards, through: :cards_in_deck

  #Validations
  validates :player_id, uniqueness: true
  validates :name, presence: true, length: { maximum: 25 }
  validate :ensure_deck_size, unless: :new_record? #Skip validation on creation

  before_validation :set_default_name, on: :create

  def populate_with_standard_cards
    return if cards.any?

    standard_cards = Card.by_effect('Standard')

    ActiveRecord::Base.transaction do
      self.cards << standard_cards
    end
  end

  private

  def set_default_name
    self.name = "#{player.username}'s Deck" if player.present?
  end

  def ensure_deck_size
    if cards.size != 52
      errors.add(:base, "Deck must have exactly 52 cards.")
      throw(:abort) # Prevent save or update
    end
  end
end
