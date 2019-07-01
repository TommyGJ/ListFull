require "rails_helper"

RSpec.describe "User Authentication", :type => :request do
  url = 'https://localhost:3000/api/v1/authenticate'
  let!(:user) { create(:user) }

  context "with accurate credentials" do

    it "returns a token if activated" do
      user.activate!
      post url, params: {"auth": {"email": user.email, "password": "password" }}
      expect(response).to have_http_status(:ok)
    end

    it "does not return a token if unactivated" do
      post url, params: {"auth": {"email": user.email, "password": "password" }}
      expect(response).to have_http_status(403)
    end
  end

  context "with inaccurate credentials" do
    it "does not return a token with no email" do
      post url, params: {"auth": {"email": nil , "password": "password" }}
      expect(response).to have_http_status(:not_found)
    end

    it "does not return a token with no password" do
      post url, params: {"auth": {"email": user.email , "password": nil  }}
      expect(response).to have_http_status(:not_found)
    end
  end
end
