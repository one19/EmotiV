var app = app || {};

app.ContactListView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click': 'showContact'
  },
  render: function () {
    var contactListTemplate = $('#contactListView').html();
    var contactListHTML = _.template(contactListTemplate);

    // Gets all related snippets
    var allRelatedSnippets = app.allSnippets.where({
      contact_id: this.model.toJSON().id
    });


    // Get the positive/negative/neutral aspect for the currentFeel

    if (allRelatedSnippets.length > 0) {

      var feedback = JSON.parse( allRelatedSnippets[ allRelatedSnippets.length - 1 ].toJSON().context ).result;

      // Adds a feedback attribute to the contact to display in app.html.erb
      var forTemplate = this.model.toJSON();
      forTemplate.feedback = feedback;

      // passes in new template so as to include feedback variable :)
      var toAppend = this.$el.html( contactListHTML( forTemplate ) );
      $("#mainApp").append( toAppend );

    }
  },
  showContact: function () {
    app.router.navigate('contacts/' + this.model.get('id'),true);
  }

});