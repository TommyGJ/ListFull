FactoryBot.define do
  factory :list do
    name { "Groceries" }

    factory :list_with_users do
      transient do
        users_count {5}
      end

      after(:create) do |user,evaluator|
        list.users << create_user(:user, evaluator.user_count)
      end
    end
  end
end
