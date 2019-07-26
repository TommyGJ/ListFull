require "rails_helper"

RSpec.describe "Add User to List", :type => :request do
  include APIHelper

  base_url = 'https://localhost:3000/api/v1/lists/'
  let!(:list) { create(:list_with_users) }
  let!(:url) { base_url + list.id.to_s + '/add_user' } 
  let(:user) { list.users.first }

  describe "failed requests" do
    before(:each) { patch url, headers: authentication_header(user) , params:  { user: {email: user_to_add.email } } }

    context "user to add does not exist" do
      let!(:user_to_add) { build(:user) }
      before { list.make_owner!(user) }

      it "returns http status 404" do
        expect(response).to have_http_status(404)
      end
    end

    context "user to add already has access to list" do 
      let!(:user_to_add) { list.users.last }
      before { list.make_owner!(user) }

      it "returns http status 422" do
        expect(response).to have_http_status(422)
      end
    end

    context "user caller does not own list" do
      let!(:user_to_add) { create(:user) }

      it "returns http status 403" do
        expect(response).to have_http_status(403)
      end
    end
  end

  describe "successful request" do
    let!(:user_to_add) { create(:user) }
    before(:each) { list.make_owner!(user) }
    before(:each) { patch url, headers: authentication_header(user), params:  { user: {email: user_to_add.email } } }

    it "returns http status 200" do
      expect(response).to have_http_status(200)
    end
  end

end

