var app = app || {};

app.SnippetView = Backbone.View.extend({
  tagName: 'div',
  render: function () {
    var snippetTemplate = $('#snippetView').html();
    var snippetHTML = _.template(snippetTemplate);

    var toAppend = this.$el.html( snippetHTML( this.model.toJSON() ) ).addClass('snippet');
    $('#snippetsHere').append(toAppend);
  }
});