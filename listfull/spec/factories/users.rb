FactoryBot.define do
  factory :user do
    first_name { "John" }
    last_name  { "Doe" }
    email { "example@example.com" }
    password { "password" }
    password_confirmation { "password" }
    activation_state { "active" }
    
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
  end
end
