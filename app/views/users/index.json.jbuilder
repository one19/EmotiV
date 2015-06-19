json.array!(@users) do |user|
  json.extract! user, :id, :name, :username, :password_digest, :email, :admin
  json.url user_url(user, format: :json)
end
