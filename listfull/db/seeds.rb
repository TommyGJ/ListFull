# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#

user1 = User.create(name: "John Doe", email: "example@example.com", password: "password", email_confirmed: true)
user1.lists.create(name: "groceries", user: user1)
user1.lists.create(name: "school supplies");
user2 = User.create(name: "Jane Doe", email: "example2@example.com", password: "password")
user2.lists.create(name: "Christmas Gifts")
Item.create(name: "Oranges", info: "Organic only", user_id: user1.id, list_id: user1.lists.first.id)
Item.create(name: "Spinach", info: "Organic only", user_id: user1.id, list_id: user1.lists.first.id)
Item.create(name: "Cheese", info: "Farm Fresh only", user_id: user1.id, list_id: user1.lists.first.id)
Item.create(name: "Xbox", info: "Newest Version", user_id: user2.id, list_id: user2.lists.first.id)
Item.create(name: "Playstation", info: "Newest Version", user_id: user2.id, list_id: user2.lists.first.id)
Item.create(name: "Makeup", info: "Sephora", user_id: user2.id, list_id: user2.lists.first.id)





