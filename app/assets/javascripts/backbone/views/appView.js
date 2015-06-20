var app = app || {};

app.AppView = Backbone.View.extend({
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