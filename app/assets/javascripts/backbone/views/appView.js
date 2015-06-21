var app = app || {};

//renders the main app view. This will run the main app view, which in turn will deploy all our other views/logic, as well as the app variable on site-load
app.AppView = Backbone.View.extend({
  // in #mainApp div render the #home script
  el: '#mainApp',
  render: function () {
    var appHTML = $('#home').html();
    this.$el.html(appHTML);

    // List out all the contacts the user has -- ONLY WORKS WHEN THIS IS COMMENTED OUT
    this.collection.each( function (contact) {
      var contactListView = new app.contactListView({model: contact});
      contactListView.render();
    });
  }

});