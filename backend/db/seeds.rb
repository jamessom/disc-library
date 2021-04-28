require 'ffaker'

User.find_by_email('sample_user@sample.com') || User.create!({
  email: 'sample_user@sample.com',
  password: 'password'
})

puts ">> Creating sample Artists"

while Artist.count <= 10
  Artist.create!(name: FFaker::Music.artist, user_id: User.first.id)
end
