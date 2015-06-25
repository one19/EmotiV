var app = app || {};

app.updateFeels = function () {
  // highestFeel
  // loop through all snippets where "result = positive" to find the highest "confidence" rating

  // lowestFeel
  // loop through all snippets where "result = negative" to find the lowest "confidence" rating

  // currentFeel
  // retrieve most recent snippet and find the result and confidence rating
  
  // weeksAverageFeel
  // take all snippets from last week and run them through an algorithm which determines

  for ( var i = 0 ; i < app.currentUserContact.length ; i++ ) {
    // feelz variables
    var highestFeel = 0;
    var lowestFeel = 0;
    var currentFeel = 0;
    var weeksAverageFeel = 0;

    console.log(app.currentUserContact[i].attributes.id);
      
  }
};