class Deck < ApplicationRecord
  belongs_to :player

  has_many :cards_in_deck, dependent: :destroy
  has_many :cards, through: :cards_in_deck

  #Validations
  validates :name, presence: true, length: { maximum: 25 }
  validates :cards, length: { is: 52 }

  before_validation :set_default_name, on: :create
  before_validation :set_standard_cards, on: :create

  private

  def set_default_name
    self.name = "#{player.username}'s Deck" if player.present?
  end

  def set_standard_cards
    cards = Card.by_effect_type('Standard')
    self.cards << cards
    player.cards << cards if player.present?
    cards
  end
end
