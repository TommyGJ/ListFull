require 'rails_helper'

RSpec.describe List, type: :model do
  it { is_expected.to have_many(:items) }
  it { is_expected.to have_many(:users).through(:list_memberships) }

  describe "Validations" do

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(20) }
    it { is_expected.to validate_length_of(:info).is_at_most(100) }

  end

  context "new list" do
    let!(:list) { create(:list) }

    it "is valid on create" do
      expect(list).to be_valid
    end

    it "is invalid without a name" do
      list.name = nil
      expect{list.save!}.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is invalid without any users" do
      #TODO
    end
  end

  describe "public instance methods" do

    let!(:list) { create (:list_with_users) }
    before(:each) do
      @user = list.users.first
    end

    context "#make_owner!" do

      it "makes user the owner of list" do
        list.make_owner!(@user)
        expect(list.list_memberships.where(user_id: @user).first.owner).to be(true)
      end
    end

    context "#owner" do
      let!(:list_without_owner) { create(:list_with_users) }
      before(:each) do
        list.make_owner!(@user)
      end

      it "returns user as the owner" do
        expect(list.owner).to eq(@user)
      end

      it "returns nil if no owner" do
        expect(list_without_owner.owner).to eq(nil)
      end
    end

    context "#add_user" do
      let!(:list_without_owner) { create(:list_with_users) }
      let(:new_user) { create(:user) }
      before { list.make_owner!(@user) }

      it "adds the new user" do
        expect{ list.add_user(new_user) }.to change { list.users.count }.by(1)
      end

    end


    context "#remove" do 
      context "user is owner" do
        before { list.make_owner!(@user) }

        it "destroys itself" do
          expect{ list.remove(@user) }.to change { List.count }.by(-1)
        end

        it "returns true" do
          expect(list.remove(@user)).to be(true)
        end
      end

      context "user is member" do

        it "destroys user membership" do
          expect{ list.remove(@user) }.to change { list.list_memberships.where(user_id: @user).count }.by(-1)
        end

        it "does not destroy itself" do
          expect{ list.remove(@user) }.to change { List.count }.by(0)
        end

        it "returns true" do
          expect(list.remove(@user)).to be(true)
        end
      end

      context "user is not member or owner" do
        let(:independent_user) { create(:user) }

        it "returns false" do
          expect(list.remove(independent_user)).to be(false)
        end
      end
    end

    context "#add_multiple_users_on_creation" do
      let!(:new_list) { create(:list) }
      let!(:new_user_owner) { create(:user) }
      before do 
        @new_users = []
        3.times do
          @new_users << create(:user)
        end
      end

      it "increases list count" do 
        p new_list
        expect{ new_list.add_multiple_users_on_creation(new_user_owner, @new_users) }.to change{ new_list.users.count }.by(+4) 
      end
    end
    
  end
end
