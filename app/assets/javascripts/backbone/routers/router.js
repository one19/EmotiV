var app = app || {};

app.AppRouter = Backbone.Router.extend({
    routes: {
        '': 'index'
    }

});

// app.AppRouter = Backbone.Router.extend({
//     routes: {
//         '': 'index',
//         'flights/:id': 'viewFlight'
//     },

//     index: function() {
//         var appView = new app.AppView({
//             collection: app.burningFlights
//         });
//         appView.render();
//     },

//     viewFlight: function(id) {
//         app.flight = app.burningFlights.get(id);
//         app.flightView = new app.FlightView({model : app.flight})
//         app.flightView.render();
//     }

// });