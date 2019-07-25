require 'rails_helper'

RSpec.describe Item, type: :model do
  it "has a valid factory" do
    expect(build(:item)).to be_valid
  end

  describe "Validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(20) }
    it { is_expected.to validate_length_of(:info).is_at_most(100) }
  end

  describe "Associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:list) }
  end

  describe "Public Instance Methods" do
    let(:item) { create(:item) }
    context "#toggle_complete" do

      context "when complete is false" do
        it { expect{ item.toggle_complete }.to change { item.complete}.from(false).to(true) } 
      end

      context "when complete is true" do
        before { item.complete = true }
        it { expect{ item.toggle_complete }.to change { item.complete}.from(true).to(false) } 
      end
    end

    context "#toggle_priority" do

      context "when priority is false" do
        it { expect{ item.toggle_priority }.to change { item.priority}.from(false).to(true) } 
      end

      context "when priority is true" do
        before { item.priority = true }
        it { expect{ item.toggle_priority }.to change { item.priority}.from(true).to(false) } 
      end
    end

    context "#owner_name_and_id" do
      let(:user_name) { item.user.first_name + ' ' + item.user.last_name }

      it { expect(item.owner_name_and_id[:id]).to eq(item.user.id) }
      it { expect(item.owner_name_and_id[:name]).to eq(user_name) }
    end
  end

  
end
