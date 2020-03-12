# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

guest = User.create(username:"Guest", email: "guest@guest.com", password:"password")
rick = User.create(username:"Rick", email: "rick@adultswim.com", password:"password")
morty = User.create(username:"Morty", email: "morty@adultswim.com", password:"password")
summer = User.create(username:"Summer", email: "summer@adultswim.com", password:"password")
beth = User.create(username:"Beth", email: "beth@adultswim.com", password:"password")
jerry = User.create(username:"Jerry", email: "jerry@adultswim.com", password:"password")
jessica = User.create(username:"Jessica", email: "jessica@adultswim.com", password:"password")
meeseeks = User.create(username:"Meeseeks", email: "meeseeks@adultswim.com", password:"password")
birdperson = User.create(username:"Birdperson", email: "birdperson@adultswim.com", password:"password")
squanchy = User.create(username:"Squanchy", email: "squanchy@adultswim.com", password:"password")
snowball = User.create(username:"Snowball", email: "snowball@adultswim.com", password:"password")
gearhead = User.create(username:"Gearhead", email: "gearhead@adultswim.com", password:"password")

Friendship.destroy_all
Expense.destroy_all
Split.destroy_all