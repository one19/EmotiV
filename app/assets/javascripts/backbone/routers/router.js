var app = app || {};

app.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    '/contacts/:id': 'viewContact',
    // '': 'test'
    //'': 'checkAuthView'
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

  //testing framework for us to test styles/links ect.
  test: function (id) {
    app.testView = new app.TestView();
    app.testView.render();
    console.log('ROUTE: test');
  },

  checkAuthView: function () {
    app.checkAuthView = new app.CheckAuthView();
    app.checkAuthView.render();
    console.log('check auth view')
  }


});
  