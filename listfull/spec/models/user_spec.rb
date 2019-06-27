require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:lists) }
  it "is invalid without a password " do
    user = User.create(email: "example@example.com", name: "John Doe", password: nil)
    expect(user).to be_invalid
  end

  it "is invalid without an email" do
    user = User.create(email: nil , name: "John Doe", password: "password")
    expect(user).to be_invalid
  end

  it "is invalid without a name" do
    user = User.create(email: "example@example.com" , name: nil , password: "password")
    expect(user).to be_invalid
  end

  
end
