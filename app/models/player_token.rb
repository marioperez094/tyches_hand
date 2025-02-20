class PlayerToken < ApplicationRecord
  belongs_to :player
  belongs_to :token
end
