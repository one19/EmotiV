var app = app || {};

app.GmailAPI = function () {
};

app.GmailAPI.prototype.appendResults = function (text) {
  var results = document.getElementById('results');
  results.appendChild(document.createElement('P'));
  results.appendChild(document.createTextNode(text));
};

app.GmailAPI.prototype.makeRequest = function () {
  var request = gapi.client.urlshortener.url.get({
    'shortUrl': 'http://goo.gl/fbsS'
  });
  request.then(function(response) {
    appendResults(response.result.longUrl);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};

app.GmailAPI.prototype.init = function () {
  gapi.client.setApiKey('AIzaSyBHhGnoGN4A9Cua9n9XM1Jwd2Ly6T6KSHc');
  gapi.client.load('urlshortener', 'v1').then(makeRequest);
};

//<script src="https://apis.google.com/js/client.js?onload=init"></script>
