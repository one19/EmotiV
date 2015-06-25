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

    var options = {
      series: {
        lines: { show: true, fill: true, fillColor: "rgba(255, 255, 255, 0.8)" },
        points: { show: true, fill: false }
      },
      xaxis: {
        mode: "time",
        //timeformat: "%m/%d/%y",
        //minTickSize: [1, "day"],
        min: _.min(datez),
        max: _.max(datez)
      },
      yaxis: {
        mode: 'number',
        min: _.min(formyz),
        max: _.max(formyz)
      }
    };
    //var series1 = [ [1,2], [2,4], [5,3], [6,9] ];
    //var series2 = [ [5,3], [7,6], [3,2], [4,3] ];
    
    //var data = [ { label: "Foo", data: [series1, series2] }, { label: "Bar", data: [ [11, 13], [19, 11], [30, -7] ] }];
    var series = []
    for ( var j = 0 ; j < feelz.length ; j++ ) {
      series.push( [ datez[j] , Math.round(formyz[j]) ] );
      // series.push( [ Math.round(formyz[j]), datez[j] ] );
    }; 
    var final = _.sortBy(series, function(el) {return el[0]})
    $.plot($('#flotHere'), [{ label: "feels", data: final }], options );
    // $.plot(
    //   $("#flotHere"), 
    //   {data: series, label: "Likeability"},
    //   {yaxis: {label: "/100"}, xaxis: {mode: "time"}}
    // );

  }
});