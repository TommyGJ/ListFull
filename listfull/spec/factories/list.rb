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

    factory :list_with_owner do
      after(:create) do |list|
        list.users << create_list(:user, 1)
        list.make_owner!(list.users[0])
      end
    end

  end
end
