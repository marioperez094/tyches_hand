class Session < ApplicationRecord
  #Associations
  belongs_to :player

  #Scopes
  scope :active, -> { where("expires_at IS NULL OR expires_at > ?", Time.current) }
  scope :expired, -> { where("expires_at IS NOT NULL AND expires_at < ?", Time.current) }
  
  #Callbacks
  before_create :generate_unique_session_token

  #Checks if session is expired
  def expired?
    expires_at.present? && expires_at < Time.current
  end

  def self.cleanup_expired
    expired.delete_all # Bulk delete expired sessions first

    # Bulk delete guest players who no longer have sessions
    Player.left_joins(:sessions)
          .where(guest: true)
          .group(:id)
          .having("COUNT(sessions.id) = 0")
          .destroy_all
  end

  private

  def set_expiration
  end

  def generate_unique_session_token
    loop do
      self.token = SecureRandom.urlsafe_base64
      break unless Session.exists?(token: self.token)#Checks for repeated tokens
    end
    
    self.expires_at ||= 24.hours.from_now # Set expiration time
  end
end
