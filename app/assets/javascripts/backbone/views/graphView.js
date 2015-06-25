var app = app || {};

app.GraphView = Backbone.View.extend({
  tagname: 'div',
  render: function () {
    //console.log('did a fucking thing, man.')

    var series1 = [ [1,2], [2,4], [5,3], [6,9] ];
    var series2 = [ [5,3], [7,6], [3,2], [4,3] ];
    var series3 = [ [61.0233,Date.parse("Mon, 22 Jun 2015 10:49:24 AEST +10:00")], [67.3682,Date.parse("Mon, 22 Jun 2015 11:15:09 AEST +10:00")], [50.0000,Date.parse("Mon, 22 Jun 2015 11:17:30 AEST +10:00")], [56.5321,Date.parse("Mon, 22 Jun 2015 12:06:41 AEST +10:00")] ]
    var series4 = [ [79.1132,Date.parse("Tue, 23 Jun 2015 11:55:26 AEST +10:00")], [65.4011,Date.parse("Tue, 23 Jun 2015 11:55:42 AEST +10:00")], [58.6840,Date.parse("Tue, 23 Jun 2015 11:55:52 AEST +10:00")], [59.7031,Date.parse("Tue, 23 Jun 2015 11:56:17 AEST +10:00")] ]
    var data = [ { label: "Foo", data: [ [10, 1], [17, -14], [30, 5] ] }, { label: "Bar", data: [ [11, 13], [19, 11], [30, -7] ] }];
    var plot = $.plot($('#flotHere'),[series3,series4]//, 
  // {label: "y = 3",data: [[0, 3], [10, 3]]}
  )}
});