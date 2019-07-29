# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(email: "example@example.com", password: "password", password_confirmation: "password", first_name: "John", last_name: "Doe")
user2 = User.create!(email: "example2@example.com", password: "password", password_confirmation: "password", first_name: "Jane", last_name: "Doe")
user3 = User.create!(email: "example3@example.com", password: "password", password_confirmation: "password", first_name: "Jane", last_name: "Doe")
user4 = User.create!(email: "tgj98@yahoo.com", password: "password", password_confirmation: "password", first_name: "Tommy", last_name: "Johnson")
user5 = User.create!(email: "example4@example.com", password: "password", password_confirmation: "password", first_name: "John", last_name: "Smith")
user6 = User.create!(email: "example5@example.com", password: "password", password_confirmation: "password", first_name: "John", last_name: "Smith")

user.activate!
user2.activate!
user3.activate!
user4.activate!
user5.activate!
user6.activate!

list1 = List.create(name: 'Groceries', deadline: DateTime.now)
list2 = List.create(name: 'Christmas Gifts', deadline: DateTime.now)
list3 = List.create(name: 'School Supplies', deadline: DateTime.now)
list4 = List.create(name: 'Fireworks', deadline: DateTime.now)
user.lists << list1
user.lists << list2
user2.lists << list3
user2.lists << list4

list1.make_owner!(user)
list2.make_owner!(user)
list3.make_owner!(user2)
list4.make_owner!(user2)


Item.create(name: 'Avocados', info: 'From Mexico', user_id: user.id, list_id: user.lists[0].id)
Item.create(name: 'Almonds', info: 'From California', user_id: user.id, list_id: user.lists[0].id)






