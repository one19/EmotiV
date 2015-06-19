json.array!(@contacts) do |contact|
  json.extract! contact, :id, :name, :email_address, :user_id, :weekFeel, :currentFeel, :highFeel, :lowFeel
  json.url contact_url(contact, format: :json)
end
