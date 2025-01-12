class Player < ApplicationRecord
  has_many :sessions, dependent: :destroy

  has_secure_password validations: false

  #Validations
  validates :username, presence: true, uniqueness: true, unless: :guest?
  validates :password, presence: true, length: { minimum: 6 }, unless: :guest?
  validates :blood_pool, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5000 }

  after_create :assign_guest_username, if: :guest?

  private

  def guest?
    guest
  end

  def assign_guest_username
    timestamp = Time.now.to_i
    update_column(:username, "Guest#{timestamp}") if username.blank?
  end
end
