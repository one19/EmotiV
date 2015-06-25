var app = app || {};

app.GraphView = Backbone.View.extend({
  tagname: 'div',
  render: function () {
    //console.log('did a fucking thing, man.')

    var datez = [];
    var feelz = [];
    for ( var i = 0 ; i < app.userSnippets.length ; i++ ) {
      var snip = app.userSnippets.models[i].attributes;
      var d = Date.parse(snip.date);
      // debugger;
      datez.push(d);
      feelz.push( JSON.parse(snip.context) );
    }

    var options = {
      series: {
        lines: { show: true },
        points: { show: true }
      },
      xaxis: {
        mode: "time",
        timezone: 'Sydney',
        timeformat: "%m/%d/%y",
        //minTickSize: [1, "day"],
        min: _.first(datez),
        max: _.last(datez)
      },
      yaxis: {
        min: 0,
        max: 100
      }
    };

    var formyz = [];
    for ( var i = 0 ; i < feelz.length ; i++ ) {
      if ( i === 1 ) {
        if ( feelz[i].result === 'Neutral' ) {
          formyz.push(50);
        }
      } 
      if ( feelz[i].result === 'Positive' ) {
        formyz.push(parseInt(feelz[i].confidence));
      } else if ( feelz[i].result === 'Negative' ) {
        formyz.push(100 - parseInt(feelz[i].confidence));
      } else if ( ( feelz[i].result === 'Neutral' ) && (i !== 1 ) ) {
        formyz.push( (_.last(formyz) + parseInt(feelz[i].confidence) - 50 ) / 2 );
      }
    }
    //var series1 = [ [1,2], [2,4], [5,3], [6,9] ];
    //var series2 = [ [5,3], [7,6], [3,2], [4,3] ];
    
    //var data = [ { label: "Foo", data: [series1, series2] }, { label: "Bar", data: [ [11, 13], [19, 11], [30, -7] ] }];
    var series = []
    for ( var j = 0 ; j < feelz.length ; j++ ) {
      series.push([datez[j], formyz[j]]);
    };
    
    var plot = $.plot($('#flotHere'), series, options );
    // $.plot(
    //   $("#flotHere"), 
    //   {data: series, label: "Likeability"},
    //   {yaxis: {label: "/100"}, xaxis: {mode: "time"}}
    // );

  }
});