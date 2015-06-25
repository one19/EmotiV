var app = app || {};

app.ContactView = Backbone.View.extend({
  el: '#mainApp',
  render: function () {
    var contactTemplate = $('#contactView').html();
    var contactHTML = _.template(contactTemplate);

    // Gets all related snippets
    var allRelatedSnippets = app.allSnippets.where({
      contact_id: this.model.toJSON().id
    });

    // Get the positive/negative/neutral aspect for the currentFeel
    var feedback = JSON.parse( allRelatedSnippets[ allRelatedSnippets.length - 1 ].toJSON().context ).result;

    // Adds a feedback attribute to the contact to display in app.html.erb
    var forTemplate = this.model.toJSON();
    forTemplate.feedback = feedback;

    this.$el.html( contactHTML( forTemplate ));
  }
});