# == Route Map
#
#       Prefix Verb   URI Pattern                  Controller#Action
#     snippets GET    /snippets(.:format)          snippets#index
#              POST   /snippets(.:format)          snippets#create
#  new_snippet GET    /snippets/new(.:format)      snippets#new
# edit_snippet GET    /snippets/:id/edit(.:format) snippets#edit
#      snippet GET    /snippets/:id(.:format)      snippets#show
#              PATCH  /snippets/:id(.:format)      snippets#update
#              PUT    /snippets/:id(.:format)      snippets#update
#              DELETE /snippets/:id(.:format)      snippets#destroy
#
#     contacts GET    /contacts(.:format)          contacts#index
#              POST   /contacts(.:format)          contacts#create
#  new_contact GET    /contacts/new(.:format)      contacts#new
# edit_contact GET    /contacts/:id/edit(.:format) contacts#edit
#      contact GET    /contacts/:id(.:format)      contacts#show
#              PATCH  /contacts/:id(.:format)      contacts#update
#              PUT    /contacts/:id(.:format)      contacts#update
#              DELETE /contacts/:id(.:format)      contacts#destroy
#
#        users GET    /users(.:format)             users#index
#              POST   /users(.:format)             users#create
#     new_user GET    /users/new(.:format)         users#new
#    edit_user GET    /users/:id/edit(.:format)    users#edit
#         user GET    /users/:id(.:format)         users#show
#              PATCH  /users/:id(.:format)         users#update
#              PUT    /users/:id(.:format)         users#update
#              DELETE /users/:id(.:format)         users#destroy
#

Rails.application.routes.draw do
  #non-nested resources, remember to not use nested locations when using JSON ajax requests
  resources :snippets
  post '/contacts/upload' => 'contacts#upload'
  resources :contacts
  resources :users

  #this routs us to the main backbone app, instead of a rails page.
  root :to => 'pages#app'

  #session controls
  get '/login' => 'pages#login'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

end
