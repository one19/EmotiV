var app = app || {};

app.updater = function () {
  app.currentUserContact = app.currentUserContact || [];
  if (app.currentUserContact.length > 0) {
      for ( var i = 0 ; i < app.currentUserContact.length ; i++ ) {
        app.contactEmails.push(app.currentUserContact[i].get("email_address"));
      }
    }
  }
  for ( var i = 0 ; i < app.currentUserContact.length ; i++ ) {
    _.findWhere()
  }
}