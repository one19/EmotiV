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
    var request = gapi.client.gmail.users.labels.list({
      'userId': 'me'
    });

    request.execute( function (resp) {
      var labels = resp.labels;
      app.checkAuthView.appendPre('Labels:');

      if (labels.length > 0) {
        for (i = 0; i < labels.length; i++) {
          var label = labels[i];
          app.checkAuthView.appendPre(label.name)
        }
      } else {
        app.checkAuthView.appendPre('No Labels found.');
      }
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