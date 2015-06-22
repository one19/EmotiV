var app = app || {};

app.ContactListView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click': 'showContact'
  },
  render: function () {
    var contactListTemplate = $('#contactListView').html();
    var contactListHTML = _.template(contactListTemplate);

    var toAppend = this.$el.html( contactListHTML( this.model.toJSON() ) );
    $("#mainApp").append( toAppend );
  },
  showContact: function () {
    app.router.navigate('contacts/' + this.model.get('id'),true);
  }

});