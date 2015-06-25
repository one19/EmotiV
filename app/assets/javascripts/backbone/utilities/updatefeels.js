var app = app || {};

app.updateFeels = function () {

  for ( var i = 0 ; i < app.currentUserContact.length ; i++ ) {

    // loop through all snippets where "result = positive" to find the highest "confidence" rating
    var highestFeel = 0;
    // loop through all snippets where "result = negative" to find the lowest "confidence" rating
    var lowestFeel = 0;
    // retrieve most recent snippet and find the result and confidence rating
    var currentFeel = 0;
    // take all snippets from last week and run them through an algorithm which determines
    var weeksAverageFeel = 0;

    // Array of all snippets belonging to each of the user's contacts
    var snip = app.allSnippets.where({contact_id: app.currentUserContact[i].attributes.id});

    // Gets the latest snippet which we will extract the numerical value of the confidence for currentFeel
    var snipCurrent = app.allSnippets.where({contact_id: app.currentUserContact[i].attributes.id})[app.allSnippets.where({contact_id: app.currentUserContact[i].attributes.id}).length-1];
    if (snipCurrent) {
      var currentContext = JSON.parse(snipCurrent.attributes.context);
      currentFeel = currentContext.confidence;
    }

    // Array of all snippets where result is negative
    var snipNeg = _.filter( snip, function (snippet) {return JSON.parse(snippet.attributes.context).result === "Negative"});
    // Determines lowestFeel for each currentUserContact
    _.each(snipNeg, function (snip) {
      var confidence = parseInt(JSON.parse(snip.attributes.context).confidence);
      if (confidence > lowestFeel) {
        lowestFeel = confidence
      }
    });
    // Array of all snippets where result is positive
    var snipPos = _.filter( snip, function (snippet) {return JSON.parse(snippet.attributes.context).result === "Positive"});
    // Determines highestFeel for each currentUserContact
    _.each(snipPos, function (snip) {
      var confidence = parseInt(JSON.parse(snip.attributes.context).confidence);
      if (confidence > highestFeel) {
        highestFeel = confidence
      }
    });

    console.log(app.allContacts.find({id: app.currentUserContact[i].attributes.id}).attributes.name,'Highest Feel:',highestFeel,'Lowest Feel:', lowestFeel);

    var contact = app.allContacts.find({id: app.currentUserContact[i].attributes.id});
    contact.set("lowFeel", lowestFeel);
    contact.set("highFeel", highestFeel);
    contact.set("weekFeel", 0);
    contact.set("currentFeel", currentFeel);
    contact.save().done(function (data) {
      console.log("HELLO!", data);
    }).error(function () {
      console.log("ERRORORORORORROR")
    });
  }
};