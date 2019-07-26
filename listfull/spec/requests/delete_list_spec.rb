require "rails_helper"

RSpec.describe "Delete List", :type => :request do
  include APIHelper

  base_url = 'https://localhost:3000/api/v1/lists/'
  let!(:user) { create(:user_with_lists) }
  let(:url) { base_url + user.lists.first.id.to_s }


  context "belongs to user" do

    it "returns http status 204" do
      delete url, headers: authentication_header(user)
      expect(response).to have_http_status(204)
    end

    it "decreases list count by 1" do
      expect{delete url, headers: authentication_header(user) }.to change(List, :count).by(-1)

    end
  end

  context "does not belong to user" do
    let!(:unauthorized_user) { create(:user, email: "example5@example.com")}

    it "returns http status 403" do
      delete url, headers: authentication_header(unauthorized_user) 
      expect(response).to have_http_status(403)
    end
  
  end

end

