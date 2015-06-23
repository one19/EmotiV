var app = app || {};

app.Contact = Backbone.Model.extend({
  urlRoot: '/contacts',
  defaults: {
    name: 'Undefined Contact',
    email_address: 'undefined@undefined.com',
    user_id: '0',
    weekFeel: '0',
    currentFeel: '0',
    highFeel: '0',
    lowFeel: '0'
  }
});