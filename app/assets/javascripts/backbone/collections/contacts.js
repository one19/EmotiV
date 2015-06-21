var app = app || {};

app.Contacts = Backbone.Collection.extend({
  model: app.Contact,
  url: '/contacts'
});