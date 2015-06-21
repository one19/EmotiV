var app = app || {};

app.TestView = Backbone.View.extend({
  el: '#mainApp',

  render: function() {
    var appTemplate = $('#testTemplate').html();
    this.$el.html(appTemplate);
  }
});