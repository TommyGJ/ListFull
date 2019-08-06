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

  describe "public instance methods" do
    let(:user) { create(:user_with_lists) }
    context "#update_secure" do
      let(:new_user_info) { build(:user) }
      let(:other_user) { create(:user) }
      let(:params) do
        {
          password: "new_password",
          password_confirmation: "new_password",
          email: new_user_info.email
        }
      end
      let(:old_password) { "password" } 
      let!(:incorrect_password) { "123456" }

      context "incorrect old password" do 
        it "returns false" do
          expect( user.update_secure(strong_params(params), incorrect_password) ).to eq(false)
        end
      end

      context "correct old password and valid parameters" do
        it "returns true" do
          expect( user.update_secure(strong_params(params), old_password) ).to eq(true)
        end
        it "changes the email" do
          user.update_secure(strong_params(params), old_password)
          expect(user.email).to eq(new_user_info.email)
        end
      end
      context "invalid parameters" do

        context "already taken email" do
          before(:each) { params["email"] = other_user.email } 
          it "returns false" do
            expect( user.update_secure(strong_params(params), old_password) ).to eq(false)
          end
        end

        context "passwords do not match" do
          before(:each) { params["password"] = "random_password" } 
          it "returns false" do
            expect( user.update_secure(strong_params(params), old_password) ).to eq(false)
          end
        end
      end

    end
  end

  private

  def strong_params(params)
    ActionController::Parameters.new(params).permit!
  end

end
