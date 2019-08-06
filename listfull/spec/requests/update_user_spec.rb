require 'rails_helper'

RSpec.describe "Update User", :type => :request do
  include APIHelper
  let(:user) { create(:user) }
  let(:url) { 'https://localhost:3000/api/v1/users/' + user.id.to_s }
  let(:updated_user) { build(:user) }
  let(:existing_user) { create(:user) }
  let(:user_params) do
    {
      user: {
        first_name: updated_user.first_name,  
        last_name: updated_user.last_name,
      }
    }
  end


  context "authorized user" do
    before(:each) { update_user }
    before(:each) { user.reload }

    context "valid fields" do
      before(:each) { update_user }
      it "returns http status 200" do
        expect(response).to have_http_status(200)
      end
      it "changes user name" do
        expect(user.first_name).to eq(updated_user.first_name)
        expect(user.last_name).to eq(updated_user.last_name)
      end
    end
    context "invalid fields" do

    end
  end

  private

  def update_user
    patch url, params: user_params, headers: authentication_header(user)
  end



end

