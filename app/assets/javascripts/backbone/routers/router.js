var app = app || {};

app.plzUpdateAjaxGods = function () {
  if (app.user_id && app.currentUserContact.length >= 1 ) {
    app.updateFeels();
    console.log('WHAMMY');  
  } else {
    console.log("MISSED AGAIN YA DICKHEAD");
  }
};
app.loadHome = function () {
  app.appView = new app.AppView({collection: app.allContacts});
  app.allSnippets = app.allSnippets || new app.Snippets();
  app.allSnippets.fetch().done(function () {
    app.appView.render();
    //console.log('when');
  });
};

app.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'contacts/:id': 'viewContact',
    'auth': 'checkAuthView'
  },

  home: function () {
    console.log("home view");
    app.appView = new app.AppView({collection: app.allContacts});
    app.allSnippets = app.allSnippets || new app.Snippets();
    app.allSnippets.fetch().done(function () {

    // List out all the contacts the user has
    app.currentUserContact = [];
    app.allContacts.each( function (contact) {
      if (contact.get('user_id') === app.user_id) {
        app.currentUserContact.push(contact);
      }
    });
    }).done(function(){
      app.plzUpdateAjaxGods();
    }).done(function(){
      console.log('done');
    }).done(function(){
      app.appView.render();
    }).done(function(){
      console.log('rendered');
    });
  },

  viewContact: function (id) {
    console.log('Individual contact view', id);
    app.allSnippets = new app.Snippets();
    app.allSnippets.fetch().done(function() {
      var contact = app.allContacts.get(id);
      app.contactView = new app.ContactView({
        model: contact
      });
      app.contactView.render();
// debugger;
      app.userSnippets = new app.Snippets(app.allSnippets.where({
        contact_id: parseInt(id)
      }));
      app.currentUserContact = [];
      app.allContacts.each(function(contact) {
        if (contact.get('user_id') === app.user_id) {
          app.currentUserContact.push(contact);
        }
      });

      if (app.user_id && app.userSnippets) {
        app.updateFeel(contact).done(function(){
          // app.contactView.render();
        });  
      }

      app.graphView = new app.GraphView(app.userSnippets);
      app.graphView.render();
      app.userSnippets.each(function(snippet) {
        app.snippetView = new app.SnippetView({
          model: snippet
        });
        app.snippetView.render();
      });
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