'use strict';

module.exports.landingPage = (event, context, callback) => {

  const html = `
  <html>
    <style>
      h1 { color: #73757d; }
    </style>
    <body>
      <button>click me to login</button>
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