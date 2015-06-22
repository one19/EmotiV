var app = app || {};

app.TestView = Backbone.View.extend({
  el: '#mainApp',

  //this finds the '#mainApp' div on our main view page, and clobbers the html inside it with the testTemplate stuff. Woohoo! We have dynamic single-page stuff happening with JS/backbone building it!
  render: function() {
    var appTemplate = $('#testTemplate').html();
    this.$el.html(appTemplate);
  }
});