var app = app || {};

app.Router = Backbone.Router.extend({
  //this sets up the router file with where each #link will take us. I'm just putting this in so that charlotte can test the layouts in a test view, sorry Andrew!
  //This immediately runs the test page, because I've set the home route to do the test view. We will have to change this to our home page. So when you run the site, test is actually being rendered, and routes and test are stored in the app variable.
  routes: {
    '' : 'test'
  },

  test: function(id) {

    app.testView = new app.TestView();
    app.testView.render();

    console.log('ROUTE: test');
  }
});