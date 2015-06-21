var app = app || {};

//sets our html.erb files to use the super-nice handlebars notation for running javascript instead of that garish <%%> garbage for ruby
_.templateSettings = {
  evaluate : /\{\[([\s\S]+?)\]\}/g,     // {[ console.log("Hello"); ]} - runs
  interpolate : /\{\{([\s\S]+?)\}\}/g   // {{ key }} - interpolates
};

//this initializes the app on page load. It immediately starts up / loads the main start page, and then loads the router page, so that we can have basic routing between the different backbone views
$(document).ready(function() {

  // creates a collection with all contacts to display
  app.allContacts = new app.Contacts();
  app.allContacts.fetch().done(function (){
    // start the main app router to handle linking between backbone views
    app.router = new app.Router();
    Backbone.history.start();
  })



});