class Session < ApplicationRecord
  #Associations
  belongs_to :player

  #Scopes
  scope :active, -> { where("expires_at IS NULL OR expires_at > ?", Time.current) }

  #Callbacks
  before_create :generate_unique_session_token

  #Checks if session is expired
  def expired?
    expires_at.present? && expires_at < Time.current
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
