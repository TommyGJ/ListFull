require 'rails_helper'

RSpec.describe List, type: :model do
  it { should have_many(:items) }

  context "new list" do
    let!(:list) { create(:list) }

    it "is valid on create" do
      expect(list).to be_valid
    end

    it "is invalid without a name" do
      list.name = nil
      expect{list.save!}.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "is invalid without a user" do
      list.user_id = nil
      expect{list.save!}.to raise_error(ActiveRecord::RecordInvalid)
    end
  end


end
