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
    // Find all snippets belonging to each of the user's contacts
    var snip = app.allSnippets.where({contact_id: app.currentUserContact[i].attributes.id});
    allSnipzzz.push(snip);
  }
  console.log(allSnipzzz);
};