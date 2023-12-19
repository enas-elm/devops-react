/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  // process.env.STORAGE_USERS_NAME
  console.log('event', event);
  var userName = event.userName;
  var region = event.region;
  var apiVersion = event.version;



  
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: region });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: apiVersion });


var params = {
  
  TableName: 'USERS' + process.env.STORAGE_USERS_NAME,
  Item: {
    // 'CUSTOMER_ID': { N: '001' },
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

// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({ region: 'REGION' });

// // Create the DynamoDB service object
// var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


// var params = {
  
//   TableName: 'USERS' + process.env.STORAGE_USERS_NAME,
//   Item: {
//     'CUSTOMER_ID': { N: '001' },
//     'CUSTOMER_NAME': { userName }
//   }
// };

// // Call DynamoDB to add the item to the table
// ddb.putItem(params, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });