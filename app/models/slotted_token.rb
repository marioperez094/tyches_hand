class SlottedToken < ApplicationRecord
  belongs_to :token
  belongs_to :token_slot

  validate :token_must_be_unique_per_player

  private

  def token_must_be_unique_per_player
    #Validates a player can only have one token in one slot
    existing_slot = token_slot.player.token_slots
      .joins(:slotted_token)
      .where(slotted_tokens: { token_id: token_id })
      #Excludes current slot from search results
      .where.not(token_slots: { id: token_slot.id })
      .first

    if existing_slot
      errors.add(:token_id, "This token is already equipped in another slot.")
    end
  end
end
