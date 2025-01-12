FactoryBot.define do
  factory :player do
    username { 'Test' }
    password { '123456' }
    guest { false }
    blood_pool { 5000 }
  end
end