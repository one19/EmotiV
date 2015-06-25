var app = app || {};

app.updateFeels = function () {
  var highestFeel = 0;
  // loop through all snippets where "result = positive" to find the highest "confidence" rating
  var lowestFeel = 0;
  // loop through all snippets where "result = negative" to find the lowest "confidence" rating
  var currentFeel = 0;
  // retrieve most recent snippet and find the result and confidence rating
  var weeksAverageFeel = 0;
  // take all snippets from last week and run them through an algorithm which determines
  var allSnipzzz = [];

  for ( var i = 0 ; i < app.currentUserContact.length ; i++ ) {

    // Array of all snippets belonging to each of the user's contacts
    var snip = app.allSnippets.where({contact_id: app.currentUserContact[i].attributes.id});
    debugger;
    // inception time
    for (var x = 0; x < snip.length; x++) {

      // Turn snippet.context into an object
      s = JSON.parse(snip[x].attributes.context);

      // Change confidence into integer for comparing
      confidence = parseInt(s.confidence);

      // Determine whether snippet is positive or negative
      if (s.result === 'Positive') {
        if (confidence > highestFeel) {
          highestFeel = confidence
        }

      } else if (s.result === 'Negative') {
        if (confidence > lowestFeel) {
          lowestFeel = confidence
        }
        
      } else {
        return
      }
      debugger;
    }
    // allSnipzzz.push(snip);
  }
  
  console.log('Highest Feel:',highestFeel,'Lowest Feel:', lowestFeel);
  // console.log(allSnipzzz);
};