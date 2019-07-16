FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }
    email { Faker::Internet.email  }
    password { "password" }
    password_confirmation { "password" }
    
    factory :user_with_lists do
      transient do
        lists_count { 5 }
      end

      after(:create) do |user,evaluator|
        user.lists << create_list(:list, evaluator.lists_count)
        user.lists.each do |list| 
          list.make_owner!(user)
        end
      end
    end
    after(:create) do |user|
      user.activate!
    end
  end
end
