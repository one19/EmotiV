# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Contact.destroy_all
Snippet.destroy_all

#admin should be the only user with the admin status, and therefore, ability to see the back-end rails pages
user1 = User.create({name: => 'admin', username: => 'admin', password: => 'admin', password_confirmation: =>'admin', email: => 'admin@admin.com'})
user2 = User.create({name: => 'Tim', username: => 'NotTim', password: => 'butt', password_confirmation: =>'butt', email: => 'butt@butt.com'})
user3 = User.create({name: => 'Todd', username: => 'Brody', password: => 'butt', password_confirmation: =>'butt', email: => 'someguy@place.com'})

#Contacts for each user, with dummy data. Note that the 'Feel's are all rounded to single digits
c1 = Contact.create({name: => 'Brett Farvre', email_address: => 'theaddress@gmail.com', weekFeel: => 89, currentFeel: => 88, highFeel: => 91, lowFeel: 34})
c2 = Contact.create({name: => 'Brett Butts', email_address: => 'theadd@gmail.com', weekFeel: => 61, currentFeel: => 66, highFeel: => 91, lowFeel: 60})
c3 = Contact.create({name: => 'Brett Narvre', email_address: => 'theress@gmail.com', weekFeel: => 67, currentFeel: => 82, highFeel: => 91, lowFeel: 56})
c4 = Contact.create({name: => 'Benny Hill', email_address: => 'ddress@gmail.com', weekFeel: => 81, currentFeel: => 80, highFeel: => 82, lowFeel: 12})
c5 = Contact.create({name: => 'Don', email_address: => 'django@gmail.com', weekFeel: => 99, currentFeel: => 88, highFeel: => 100, lowFeel: 22})
c6 = Contact.create({name: => 'Knotts', email_address: => 'brodbidgagnian@gmail.com', weekFeel: => 23, currentFeel: => 45, highFeel: => 64, lowFeel: 1})

#Snippets
s1 = Snippet.create({})
