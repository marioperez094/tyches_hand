class SlottedToken < ApplicationRecord
  belongs_to :token
  belongs_to :token_slot
end
