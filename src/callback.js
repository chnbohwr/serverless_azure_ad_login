'use strict';
const axios = require('axios');
const querystring = require('querystring');
const config = require('./config.js');

module.exports.callback = (event, context, callback) => {
  const code = event.queryStringParameters.code;
  axios({
    method: 'post',
    url: `https://login.microsoftonline.com/${config.tenent}/oauth2/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      grant_type: 'authorization_code',
      client_id: config.client_id,
      client_secret: config.client_secret,
      redirect_uri: config.callbackUrl,
      code,
      resource: 'https://graph.windows.net',
    })
  }).then((resp) => {
    console.log(resp.data);
    const accessToken = resp.data.access_token;
    axios({
      method: 'get',
      url: `https://graph.windows.net/${config.tenent}/me?api-version=1.6`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }).then(profile=>{
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: profile.data,
      };
  
      // callback is sending HTML back
      callback(null, response);
    })
  }).catch(e =>{
    const response = {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: e,
    };

    // callback is sending HTML back
    callback(null, response);
  });

};