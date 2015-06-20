var app = app || {};

app.Router = Backbone.Router.extend({
  //this sets up the router file with where each #link will take us. I'm just putting this in so that charlotte can test the layouts in a test view, sorry Andrew!
  routes: {
    '' : 'test'
  },

  test: function(id) {

    app.testView = new app.TestView();
    app.testView.render();

    console.log('ROUTE: test');
  }
});