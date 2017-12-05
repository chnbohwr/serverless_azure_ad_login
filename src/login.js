'use strict';
var config = require('./config.js');

module.exports.landingPage = (event, context, callback) => {
  console.log(config);
  const url = `https://login.microsoftonline.com/${config.tenent}/oauth2/authorize?client_id=${config.client_id}&response_type=code&redirect_uri=${config.callbackUrl}&response_mode=query&resource=https://graph.windows.net&state=12345`;
  const html = `
  <html>
    <style>
      h1 { color: #73757d; }
    </style>
    <script>
      function login(){
        location.href='${url}';
      }
    </script>
    <body>
      <button onclick="login()">click me to login</button>
    </body>
  </html>`;

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  };

  // callback is sending HTML back
  callback(null, response);
};