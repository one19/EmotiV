// Your Client ID can be retrieved from your project in the Google
var app = app || {};

// Developer Console, https://console.developers.google.com
var CLIENT_ID = '1063464784487-2ok02fg85mtp1ann5unfah32r7k3ppkb.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

// var base64 = require('base64-js');

app.CheckAuthView = Backbone.View.extend({
  el: '#mainApp',

  events: {
    'click': 'handleAuthClick'
  },

  /**
   * Check if current user has authorized this application.
   */
  checkAuth: function () {
    gapi.auth.authorize(
      {
        'client_id': CLIENT_ID,
        'scope': SCOPES,
        'immediate': true
      }, app.CheckAuthView.handleAuthResult);
  },

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  handleAuthResult: function (authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      //console.log('success')
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      app.checkAuthView.loadGmailApi();
    } else {
      //console.log('failure')
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  },

  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  handleAuthClick: function (event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      app.checkAuthView.handleAuthResult);
    //console.log('this shit authorized')
    return false;
  },

  /**
   * Load Gmail API client library. List labels once client library
   * is loaded.
   */
  loadGmailApi: function () {
    gapi.client.load('gmail', 'v1', app.checkAuthView.grabHundred);
  },

  makeSnippets: function (emotMass, messages) {
    var emotes = emotMass;
    for (var i = 0 ; i < messages.length ; i++ ) {
      console.log("I: ", i);
      var message = messages[i];
      var snippet = new app.Snippet();

      //checks for messages vs emails
      if ( message.result.payload.headers.length === 1 ) {
        var infArra = message.result.payload.headers[0].value.split(' ');
        var emailStr = infArra.pop().slice(1, -1);
        //if the message email is equal to the current user's
        if ( emailStr === app.email ) {
          snippet.set( 'inbound', false );
          var threadEmail = '';
          threadEmail = _.findWhere(app.threads, {thread: message.result.threadId});
          var theEmail = threadEmail.email.split(' ').pop();
          //checks if there is a pre-existing thread that we've spoken to, and if they've spoken back. Returns their id if they have, and dumps the whole shit-heap if they haven't.
          if (theEmail.slice(1,-1) !== app.email) {
            var use = app.allContacts.findWhere( {email_address: theEmail.slice(1,-1)} );
            snippet.set( 'contact_id', parseInt(use.id) );
          };

        } else {
          snippet.set( 'inbound', true );
          var use = app.allContacts.findWhere( {email_address: emailStr} );
          snippet.set( 'contact_id', parseInt(use.id) );
        };

      //does the same checking for emails
      } else {
        var from = _.findWhere(message.result.payload.headers, {name: 'From'});
        var fromEmail = from.value.split(' ').pop().slice(1,-1);
        if ( fromEmail === app.email ) {
          snippet.set( 'inbound', false );
          var delivEmail = _.findWhere(message.result.payload.headers, {name: 'Delivered-To'}).value;
          if (delivEmail !== fromEmail) {
            var use = app.allContacts.findWhere( {email_address: delivEmail} );
            snippet.set( 'contact_id', parseInt(use.id) );
          }
        } else {
          snippet.set( 'inbound', true );
          var use = app.allContacts.findWhere( {email_address: fromEmail} );
          snippet.set( 'contact_id', parseInt(use.id) );
        };
      };

      var completed = function ( messages, i ) {
        // console.log("\n\n\n\n\nWOOOWONKANKNKNKNESLKFNLWKFNLWKMNLKMLALKNLKANSLKMLKNFLKWN\n\n\n\n");
        // console.log( messages, messages.length, i++ );
        // console.warn( i, messages.length - 1, "DO THEY EQUAL!", i === messages.length -1 );
        if ( i === messages.length ) {
          // console.log("\n\n\n\n\nWOOOWONKANKNKNKNESLKFNLWKFNLWKMNLKMLALKNLKANSLKMLKNFLKWN\n\n\n\n");
          app.router.navigate('/', true);
          return;
        }
      }

      //saves the snippet
      var d = new Date(parseInt(message.result.internalDate));
      snippet.set( 'context', JSON.stringify(emotMass[i]) );
      snippet.set( 'date', d );
      snippet.set( 'gid', message.result.id );
      snippet.save().always( function () {
        // console.log("PLEASE ", messages.length, i, messages.length === i);
        completed( messages, i );
        return false;
      });
    }
  },

  //this makes the contacts for a given message
  makeContacts: function (message) {
    
    //setup steps
    var contact = new app.Contact();
    app.contactEmails = app.contactEmails || [];
    app.currentUserContact = app.currentUserContact || [];

    //this loop checks if the current list of contactEmails contains it's own email, if it doesn't, it appends that email to the contactEmails list. This is used later to eliminate messages from this user, with no 'to' address
    if ( !_.contains(app.contactEmails, app.email) ) {
      app.contactEmails.push(app.email);
    }
    // this loop checks whether or not the current user has any contacts saved, and if they do, maps them to the contactEmails app variable for use in checking against duplicates later.
    if (app.currentUserContact.length > 0) {
      for ( var i = 0 ; i < app.currentUserContact.length ; i++ ) {
        app.contactEmails.push(app.currentUserContact[i].get("email_address"));
      }
    }


    // Start of the makeContacts function
    if ( message.payload.headers.length === 1 ) {

      //this is the loop that handles hangouts conversations
      //setup:
      var infArra = message.payload.headers[0].value.split(' ');
      var emailStr = infArra.pop();
      
      //this gets the email address out of the <> tags it's within
      contact.set( 'email_address', emailStr.slice(1, -1) );
      //stops most duplicates from being posted
      if ( _.contains(app.contactEmails, contact.attributes.email_address) ) {
        return;
      } else {
        //saves the contact
        app.contactEmails.push( contact.attributes.email_address );

        contact.set( 'name', infArra.join(' ') );
        contact.set( 'user_id', parseInt(app.user_id) );
        contact.set( 'threadIds', message.payload.threadId )
        contact.save().done(function (result) {
          // contact.set('id', result.id);
          //console.log(contact);
          app.allContacts.add(contact);
        });

        // need fetch before add to collection to get id

      }

    } else {
      //this is the loop that handles emails
      //setup:
      var from = _.findWhere(message.payload.headers, {name: 'From'});
      from = from.value.split(' ')
      var fromEmail = from.pop().slice(1,-1);
      var fromName = from.join(' ');
      var toEmail = _.findWhere(message.payload.headers, {name: 'Delivered-To'}).value;
      //this stops most duplicates from being posted
      if ( _.contains(app.contactEmails, fromEmail) ) {
        return
      } else {
        //saves the contact
        app.contactEmails.push( fromEmail );

        contact.set( 'email_address', fromEmail)
        contact.set( 'name', fromName );
        contact.set( 'user_id', parseInt(app.user_id) );
        contact.set( 'threadIds', message.payload.threadId )
        contact.save().done(function (result) {
          //console.log(contact);
          app.allContacts.add(contact);
        });

        app.allContacts.add(contact);
      }
      
    }
  },

  //takes in a batch of 100 responses, maps them to a big JSON request, and posts it to our sentiment API, on return, executes the snippet creation on the batch
  batchEmote: function (resp) {
    //setup
    var messages = $.map(resp, function (el) {return el;});
    var emotMass = [];
    //each message do:
    for ( var i = 0 ; i < messages.length ; i++ ) {
      var message = messages[i];
      var text = [];
      //conditional to handle hangouts vs gmail
      if ( message.result.payload.body.data ) {
        text = base64js.toByteArray( message.result.payload.body.data );
      } else {
        for ( var j = 0 ; j < message.result.payload.parts.length ; j++ ) {
          if ( message.result.payload.parts[j].body.data ) {
            text += base64js.toByteArray( message.result.payload.parts[j].body.data );
          }
        }
      }
      //turns that ugly-assed array of string chars into a beautiful butterfly(string)
      var words = '';
      for ( var k = 0 ; k < text.length ; k++ ) {
        words += String.fromCharCode(text[k])
      };
      //var text = window.atob(message.result.payload.body.data);
      emotMass.push(words);
    }

    //ajax request for interfacing with the sentiment api. Returns a big batch of JSON sentiment responses
    $.ajax({
      url: 'http://sentiment.vivekn.com/api/batch/',
      method: "POST",
      dataType: "JSON",
      data: JSON.stringify( emotMass ),
      //on success, make a function call to make snippets with the data returned from the ajax request, as well as all the message data, for everything not called context
      success: function (data) {
        app.checkAuthView.makeSnippets(data, messages);
      },
      error: function (data) {
        //console.log(data);
      }
    });

  },
  /**
   * Print all Labels in the authorized user's inbox. If no labels
   * are found an appropriate message is printed.
   */
  grabHundred: function () {
    var request = gapi.client.gmail.users.messages.list({
      'userId': 'me',
      //'pageToken': 1
    });

    request.execute( function (resp) {
      //setup:
      var messages = resp.messages;
      var batch = gapi.client.newBatch();
      app.checkAuthView.appendPre('LOADING MESSAGES');


      //this generates the batch file for every email id in our 100 responses from the server
      if (messages.length > 0) {
        for (var i = 0; i < messages.length ; i++) {
          var message = messages[i];
          //this adds commands to the batch request one at a time for each element
          batch.add(gapi.client.gmail.users.messages.get({'userId': 'me', 'id': message.id}));
          //app.checkAuthView.appendPre(thread.name)
        }
      } else {
        app.checkAuthView.appendPre('No messages input.');
      }

      //this executes the batched get requests, and on completion starts the contact making process, and finally the batched sentiment api call for the snippet making process
      batch.execute( function (resp) {
        //console.log(resp);
        var messages = $.map(resp, function (el) {return el;});
        app.threads = app.threads || [];
        //if the current message isn't for the sender, append the thread id and user email to an object stored in app.threads
        for ( var i = 0 ; i < messages.length ; i++ ) {
          var message = messages[i];

          if ( message.result.payload.headers[0].value !== app.email ) {
            app.threads.push({thread: message.result.threadId, email: message.result.payload.headers[0].value});
          }
        }

        //if we get messages back from gmail, start making contacts out of each of them
        if (messages.length > 0) {
          for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            app.checkAuthView.makeContacts(message.result);
          }
        //if we get no messages, shit your pants
        } else {
          app.checkAuthView.appendPre('No messages found.');
        }

        //this executes snippet creation on the mass of messages
        app.checkAuthView.batchEmote(resp);
      });

    } );
  },

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre: function (message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  },

  //renders the view... duh.
  render: function () {
    var appTemplate = $('#authorizeView').html();
    this.$el.html(appTemplate);
  }
});