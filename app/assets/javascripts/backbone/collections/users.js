var app = app || {};

app.users = Backbone.Collection.extend({
  model: app.user,
  url: '/users'

});