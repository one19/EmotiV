var app = app || {};

app.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'contacts/:id': 'viewContact',
    'auth': 'checkAuthView'
  },

  home: function () {
    console.log("home view");
    app.appView = new app.AppView({collection: app.allContacts});
    
    app.allSnippets = new app.Snippets();
    app.allSnippets.fetch().done(function () {
      app.appView.render();
    });
  },

  viewContact: function (id) {
    console.log('Individual contact view',id);
    var contact = app.allContacts.get(id);
    app.contactView = new app.ContactView({model: contact});
    app.contactView.render();

    app.userSnippets = new app.Snippets( app.allSnippets.where({ 
      contact_id: parseInt(id)
    }));
    app.graphView = new app.GraphView ( app.userSnippets );
    app.graphView.render();
    app.userSnippets.each( function ( snippet ) {
      app.snippetView = new app.SnippetView( {model:snippet} );
      app.snippetView.render();
    });
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
  