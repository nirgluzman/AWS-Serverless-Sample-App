// DynamoDB examples using SDK for JavaScript (v2)

const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

module.exports.handler = async event => {
  console.log('Event=', event);

  // Create the DynamoDB service object
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE
  };

  const result = await dynamodb.scan(scanParams).promise();

  if (result.Count === 0) {
    console.log('No customers found in Database');

    return {
      statusCode: 204 // No Content; response cannot contain a message body!
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items.map(customer => {
        return {
          id: customer.id,
          name: customer.name,
          email: customer.email
        };
      })
    })
  };
};
