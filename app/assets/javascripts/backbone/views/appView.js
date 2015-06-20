var app = app || {};

//renders the main app view. This will run the main app view, which in turn will deploy all our other views/logic, as well as the app variable on site-load
app.AppView = Backbone.View.extend({
  el: '#mainApp',

  render: function() {
    console.log('App loaded?')
  }

});