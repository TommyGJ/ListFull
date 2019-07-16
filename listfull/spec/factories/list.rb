FactoryBot.define do
  factory :list do
    name { "Groceries" }

    factory :list_with_users do
      transient do
        users_count {5}
      end

      after(:create) do |list,evaluator|
        list.users << create_list(:user, evaluator.users_count)
      end
    end
  end
end
