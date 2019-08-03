require 'rails_helper'

RSpec.describe "Update List", :type => :request do
  include APIHelper

  let(:user) { create(:user_with_lists) }
  let(:list) { user.lists.first }
  let(:url) { 'https://localhost:3000/api/v1/lists/' + list.id.to_s }
  let(:updated_list) { build(:list) }
  let(:list_params) do
    {
      list: {
        name: updated_list.name,
        info: updated_list.info,
      }
    }
  end

  context "user owns list" do
    before(:each) { update_list }
    context "valid list params" do
      it "returns http status 200" do
        expect(response).to have_http_status(200)
      end
    end
  end

  private

  def update_list
    patch url, params: list_params, headers: authentication_header(user)
  end

  
end

