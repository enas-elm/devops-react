/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {

  console.log('event', event);
  console.log('process.env:', process.env.STORAGE_USERS_NAME)
  var userName = event.userName;
  var region = event.region; 
  var name =  event.request.userAttributes.name; 
  var email = event.request.userAttributes.email; 
  var family_name = event.request.userAttributes.family_name; 


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
  await ddb.putItem({
    TableName: process.env.STORAGE_USERS_NAME,
    Item: {
      'id': { S: userName } ,
      'name':{S:name}, 
      'email':{S:email}, 
      'family_name':{S:family_name}
    }
  }
  ).promise();

  console.log("test")

  return event;
};
