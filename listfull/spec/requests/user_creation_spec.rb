require "rails_helper"
RSpec.describe "User Creation", :type => :request do
  url = 'https://localhost:3000/api/v1/new_account'
  let!(:user) { create(:user) }

  context "with correct creation information" do
    let!(:new_user) { build_stubbed(:user, email: "example2@example.com") }

    it "creates a new user" do
      post url, params: { "user": { "email": new_user.email , "password": "password" , "password_confirmation": "password" , "first_name": new_user.first_name , "last_name": new_user.last_name }}
      expect(response).to have_http_status(:ok)
    end
  end

  context "with duplicate email" do
    let!(:new_user) { build_stubbed(:user) }

    it "does not create a new user" do
      post url, params: { "user": { "email": user.email , "password": "password" , "password_confirmation": "password" , "first_name": new_user.first_name , "last_name": new_user.last_name }}
      expect(response).to have_http_status(422)
    end
  end

  context "with no password comfirmation" do
    let!(:new_user) { build_stubbed(:user, email: "example2@example.com") }

    it "does not create a new user" do
      post url, params: { "user": { "email": new_user.email , "password": "password" , "password_confirmation": nil  , "first_name": new_user.first_name , "last_name": new_user.last_name }}
      expect(response).to have_http_status(422)
    end
  end

end

