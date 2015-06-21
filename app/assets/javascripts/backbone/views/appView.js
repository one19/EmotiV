var app = app || {};

app.AppView = Backbone.View.extend({
<<<<<<< HEAD
  el: '#home',
  render: function () {
    var appHTML = $('#')
  }
});

// app.AppView = Backbone.View.extend({
//     el: '#main',

//     render: function() {
//         var appHTML = $('#appTemplate').html();
//         this.$el.html(appHTML)

//         this.collection.each(function(flight) {
//             var flightListView = new app.FlightListView({model: flight});
//             flightListView.render();
//         });
//     }


// });
=======
  el: '#mainApp',

  render: function() {
    console.log('App loaded?')
  }

});
>>>>>>> 1004ac71290e0f68bcf5030ec4cd66643d793fb7
