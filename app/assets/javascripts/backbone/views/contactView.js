var app = app || {};

app.ContactView = Backbone.View.extend({
  el: '#mainApp',
  render: function () {
    var contactTemplate = $('#contactView').html();
    var contactHTML = _.template(contactTemplate);
    this.$el.html( contactHTML( this.model.toJSON() ));
  }
});