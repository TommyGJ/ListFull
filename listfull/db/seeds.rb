# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(email: "example@example.com", password: "password", password_confirmation: "password", first_name: "John", last_name: "Doe")
user2 = User.create!(email: "example2@example.com", password: "password", password_confirmation: "password", first_name: "Jane", last_name: "Doe")
user.activate!
user2.activate!

user.lists.create([{ name: 'Groceries' }, { name: 'Christmas Gifts' }])
user2.lists.create([{ name: 'School Supplies' }, { name: 'Gifts' }])


