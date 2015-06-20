var app = app || {};

app.AppRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        '/contacts/:id': 'viewContact'
    },

    index: function () {
      // Retrieve all contacts
      // Render contacts
      // var appView = new 
    },

    viewContact: function () {
      // Retrieve a contact
      // Render contact
    }

});

// app.AppRouter = Backbone.Router.extend({

//   routes: {
//     ''          : 'index',
//     'posts/:id': 'viewPost'
//   },

//   // GET /
//   index: function () {
//     console.log('index route');
//     var appView = new app.AppView({collection: app.blogPosts});
//     appView.render();
//   },

//   // GET /posts/:id
//   viewPost: function (id) {
//     console.log('viewPost route',id);
//     var post = app.blogPosts.get(id);
//     var postView = new PostView({model:post});
//     postView.render();
//   }

// });