require 'rails_helper'

RSpec.describe List, type: :model do
  it { should have_many(:items) }
  it "is invalid without a user" do
    list = List.create(name: "Groceries")
    expect(list).to be_invalid
  end

  it "is valid with a user" do
    user = User.create(email: "example@example.com", first_name: "John", last_name: "Doe", password: "password", password_confirmation: "password")
    list = List.create(name: "Groceries", user: user)
    expect(list).to be_valid
  end

  it "is invalid without a name  " do
    user = User.create(email: "example@example.com", first_name: "John", last_name: "Doe", password: "password", password_confirmation: "password")
    list = List.create(user: user)
    expect(list).to be_invalid
  end


end
