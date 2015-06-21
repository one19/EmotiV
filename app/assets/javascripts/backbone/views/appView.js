var app = app || {};

//renders the main app view. This will run the main app view, which in turn will deploy all our other views/logic, as well as the app variable on site-load
app.AppView = Backbone.View.extend({
  // in #mainApp div render the #home script
  el: '#mainApp',
  render: function () {
    var appHTML = $('#home').html();
    this.$el.html(appHTML);

    // List out all the contacts the user has -- need to edit either model or controller so that only appropriate contacts are listed 'user_id'
    this.collection.each( function (contact) {
      app.contactListView = new app.ContactListView({ model: contact });
      app.contactListView.render();
    });
  }

});