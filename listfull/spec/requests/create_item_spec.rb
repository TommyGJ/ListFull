require "rails_helper"

RSpec.describe "Create Item ", :type => :request do
  include APIHelper

  let(:url) { 'https://localhost:3000/api/v1/items' }
  let(:user) { create(:user_with_lists) }
  let(:list) { user.lists.first }
  let(:item) { build(:item) }
  let (:item_params) do 
      { 
        item: { 
          name: item.name, 
          info: item.info, 
          user_id: user.id, 
          list_id: list.id 
        } 
      } 
  end


  context "valid item" do
    before(:each) { post_item } 
 
    it "returns http status 200" do
      expect(response).to have_http_status(200)
    end

    it "increases item count by 1" do
      expect { post_item }.to change(Item, :count).by(+1)
    end

    it "increases the users items by 1" do
      expect { post_item }.to change(user.items, :count).by(+1)
    end

    it "increases the lists items by 1" do
      expect { post_item }.to change(list.items, :count).by(1)

    end
  end

  private

  def post_item
    post url, params: item_params, headers: authentication_header(user)
  end

end

