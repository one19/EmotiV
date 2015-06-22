// Your Client ID can be retrieved from your project in the Google
var app = app || {};

// Developer Console, https://console.developers.google.com
var CLIENT_ID = '1063464784487-2ok02fg85mtp1ann5unfah32r7k3ppkb.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

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
    console.log("afsdgsdgds")
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      console.log('success')
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      app.checkAuthView.loadGmailApi();
    } else {
      console.log('failure')
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
    console.log('this shit authorized')
    return false;
  },

  /**
   * Load Gmail API client library. List labels once client library
   * is loaded.
   */
  loadGmailApi: function () {
    gapi.client.load('gmail', 'v1', app.checkAuthView.listLabels);
  },

  /**
   * Print all Labels in the authorized user's inbox. If no labels
   * are found an appropriate message is printed.
   */
  listLabels: function () {
    // var request = gapi.client.gmail.users.labels.list({
    //   'userId': 'me'
    // });

    var request = gapi.client.gmail.users.messages.list({
      'userId': 'me'
    });

    request.execute( function (resp) {

      var messages = resp.messages;

      var batch = gapi.client.newBatch();
      app.checkAuthView.appendPre('Messages:');

      //this generates the batch file for every email id in our 100 responses from the server
      if (messages.length > 0) {
        for (var i = 0; i < messages.length - 5 ; i++) {
          var message = messages[i];

          //this adds commands to the batch request one at a time for each element
          batch.add(gapi.client.gmail.users.messages.get({'userId': 'me', 'id': message.id}));
          //app.checkAuthView.appendPre(thread.name)
        }
      } else {
        app.checkAuthView.appendPre('No messages found.');
      }

      //this executes the batched get requests, and on completion adds parts of them to the page
      batch.execute( function (resp) {
        var messages = resp;
        console.log(resp)

        if (messages.length > 0) {
          for (var i = 0; i < messages.length; i++) {
            var message = messages[i];

            app.checkAuthView.appendPre(message.payload.headers[0]);
          }
        } else {
          app.checkAuthView.appendPre('No messages found.');
        }

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

  render: function () {
    var appTemplate = $('#authorizeView').html();
    this.$el.html(appTemplate);
  }
});