'use strict';

module.exports.landingPage = (event, context, callback) => {
  console.log(event);
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: event.code,
  };

  // callback is sending HTML back
  callback(null, response);
};