FactoryBot.define do
  factory :item do
    name { Faker::Food.fruits }
    info { Faker::Lorem.sentence(3, true, 4) }
    user
    list
  end
end
