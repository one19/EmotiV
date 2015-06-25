var app = app || {};

app.GraphView = Backbone.View.extend({
  tagname: 'div',
  render: function () {
    var options = {
    series: {
        lines: { show: true },
        points: { show: true }
      }
    };
    //console.log('did a fucking thing, man.')
    var plot = $.plot($('#flotHere'), [[0,0],[0.1,0.2],[0.15,0.3]], options)
  }
})