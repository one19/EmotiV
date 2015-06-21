var app = app || {};

_.templateSettings = {
  evaluate : /\{\[([\s\S]+?)\]\}/g,     // {[ console.log("Hello"); ]} - runs
  interpolate : /\{\{([\s\S]+?)\}\}/g   // {{ key }} - interpolates
};

$(document).ready(function() {
  //on document ready start the app, and start the router
  app.appView = new app.AppView();
  app.appView.render();

  app.router = new app.Router();
  Backbone.history.start();
});