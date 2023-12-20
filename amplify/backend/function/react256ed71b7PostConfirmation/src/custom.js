/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {

  console.log('event', event);
  console.log('process.env:', process.env.STORAGE_USERS_NAME)
  var userName = event.userName;
  var region = event.region;


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({ region: region });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


var params = {
  
  TableName: process.env.STORAGE_USERS_NAME,
  Item: {
    'id': { S: userName }
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

  return event;
};
