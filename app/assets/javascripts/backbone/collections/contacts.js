var app = app || {};

app.Contacts = new Backbone.Collection.extend({
  model: app.Contact,
  url: '/contacts'
});