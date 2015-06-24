var app = app || {};

app.Snippet = Backbone.Model.extend({
  urlRoot: '/snippets',
  defaults: {
    inbound: 'false',
    contact_id: '0',
    context: '{confidence: "50.0000", result: "Neutral"}',
    date: '2015-04-05T13:11:11.000+10:00',
    gid: '0000000000000000'
  }
});