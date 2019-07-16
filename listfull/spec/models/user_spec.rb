require 'rails_helper'

RSpec.describe User, type: :model do
  it "has a valid factory" do
    expect(build(:user)).to be_valid 
  end


  it { is_expected.to have_many(:lists) }



  context "new user" do
    let(:user) { create(:user) }

    it "is invalid without a password " do
      expect{create(:user, password: '' )}.to raise_error(ActiveRecord::RecordInvalid) 
    end

    it "is invalid without a password confirmation" do
      expect{create(:user, password: "password", password_confirmation: nil)}.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is invalid without an email" do
      expect{create(:user, email: nil)}.to raise_error(ActiveRecord::RecordInvalid) 
    end

    it "is invalid without a name" do
      user.first_name = nil
      user.last_name = nil
      expect(user).to be_invalid
    end

    it "is valid with all fields filled out" do
      expect(user).to be_valid
    end
  end
end
