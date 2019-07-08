require "rails_helper"

RSpec.describe "Create New List", :type => :request do
  url = 'https://localhost:3000/api/v1/lists'
  let!(:user) { create(:user) }
  before { @token = JsonWebToken.encode( sub: user.id, email: user.email )}

  context "with a valid new list" do
    let(:valid_list_params) do
      {
        list: {
          name: "Groceries",
          deadline: (Time.now.to_f * 1000).to_f
        }
      }
    end

    it "returns http status 200" do
      post url, params: valid_list_params, headers: { 'Authorization': "Bearer " + @token }  
      p response
      expect(response).to have_http_status(200)
    end
    
    it "increases list count by 1" do
      expect{post url, params: valid_list_params, headers: { 'Authorization': "Bearer " + @token }}.to change(List, :count).by(+1)  
    end

  end

  private
  
  

  
end


