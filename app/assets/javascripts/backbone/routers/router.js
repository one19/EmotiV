var app = app || {};

app.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    '/contacts/:id': 'viewContact' //,
    // '': 'test'
  },

  home: function () {
    console.log("home view");
    app.appView = new app.AppView({collection: app.allContacts});
    app.appView.render();
  },

  viewContact: function () {
    // Retrieve a contact
    // Render contact
  },

  //this sets up the router file with where each #link will take us. I'm just putting this in so that charlotte can test the layouts in a test view, sorry Andrew!
  //This immediately runs the test page, because I've set the home route to do the test view. We will have to change this to our home page. So when you run the site, test is actually being rendered, and routes and test are stored in the app variable.
  test: function(id) {
    app.testView = new app.TestView();
    app.testView.render();
    console.log('ROUTE: test');
  }
});
  