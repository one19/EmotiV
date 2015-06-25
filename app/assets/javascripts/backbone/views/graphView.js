var app = app || {};

app.GraphView = Backbone.View.extend({
  tagname: 'div',
  render: function () {
    //console.log('did a fucking thing, man.')
    $(document).ready(function() {
      var datez = [];
      var feelz = [];
      for ( var i = 0 ; i < app.userSnippets ; i++ ) {
        var snip = app.userSnippets.models[i].attributes;
        var d = new Date( parseInt(snip.date) );
        datez.push(d);
        feelz.push( JSON.parse(snip.context) );
        debugger;
      }

      var options = {
        series: {
          lines: { show: true },
          points: { show: true }
        }
      };


      var series1 = [ [1,2], [2,4], [5,3], [6,9] ];
      var series2 = [ [5,3], [7,6], [3,2], [4,3] ];
      
      var data = [ { label: "Foo", data: [series1, series2] }, { label: "Bar", data: [ [11, 13], [19, 11], [30, -7] ] }];
      var plot = $.plot($('#flotHere'),[series1,series2], options ); 
  // {label: "y = 3",data: [[0, 3], [10, 3]]}
    })
  }
});