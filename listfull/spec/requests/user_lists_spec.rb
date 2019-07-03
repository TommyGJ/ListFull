require "rails_helper"

RSpec.describe "Get User Lists", :type => :request do
  url = 'https://localhost:3000/api/v1/me'
  let!(:user) { create(:user_with_lists, lists_count: 5 ) }
  before { @token = JsonWebToken.encode( sub: user.id, email: user.email )} 

  context "with a valid token" do
    it "returns http status 200 " do
      get url, headers: { 'Authorization': "Bearer " + @token }  
      #p response.body
      expect(response).to have_http_status(:ok)
    end

    it "returns the users lists" do
      get url, headers: { 'Authorization': "Bearer " + @token }  
      parsed_body = JSON.parse(response.body)
      parsed_body["included"].each do |lst|
        p lst
        expect(lst["type"]).to eq("list")
      end
    end
  end

  context "with an invalid token" do
    it "returns http status 401" do
      invalid_token = @token + "a" * 5
      get url, headers: { 'Authorization': "Bearer " + invalid_token }  
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
