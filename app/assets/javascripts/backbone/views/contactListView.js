var app = app || {};

app.ContactListView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click': 'showContact'
  },
  render: function () {
    var contactListTemplate = $('#ContactListView').html();
    var contactListHTML = _.template(contactListTemplate);

    this.$el.html(contactListHTML(this.model.toJSON()));
  },
  showContact: function () {
    app.router.navigate('contacts/' + this.model.get('id'),true)
  }

});