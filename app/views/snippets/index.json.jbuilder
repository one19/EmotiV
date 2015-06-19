json.array!(@snippets) do |snippet|
  json.extract! snippet, :id, :inbound, :contact_id, :context, :date
  json.url snippet_url(snippet, format: :json)
end
