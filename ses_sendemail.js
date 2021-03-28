#Reference https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'eu-north-1'});

// Create sendEmail params
var params = {
  ConfigurationSetName: 'SES-Logging-Configuration-Set',
  Destination: {
    ToAddresses: [
      'success@simulator.amazonses.com',
      'bounce@simulator.amazonses.com',
      'ooto@simulator.amazonses.com',
      'complaint@simulator.amazonses.com',
      'suppressionlist@simulator.amazonses.com'
    ]
  },
  Message: {
    Body: {
      Html: {
       Charset: "UTF-8",
       Data: "HTML_FORMAT_BODY"
      },
      Text: {
       Charset: "UTF-8",
       Data: "TEXT_FORMAT_BODY"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Test email'
     }
    },
  Source: process.env.MY_EMAIL,
  ReplyToAddresses: [
     process.env.MY_EMAIL
  ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
