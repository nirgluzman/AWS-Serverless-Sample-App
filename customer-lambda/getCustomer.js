// DynamoDB examples using SDK for JavaScript (v2)
// https://stackoverflow.com/questions/64839655/how-to-use-dynamodb-documentclient-get-data-outside-of-function

const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

module.exports.handler = async event => {
  console.log('Event=', event);

  const { id } = event.pathParameters;
  console.log(id);

  // Create the DynamoDB service object
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const getParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: { id }
  };

  const result = await dynamodb.get(getParams).promise();

  if (!result.Item) {
    console.log(`No customer found with id=${id}`);

    return {
      statusCode: 204 // No Content; response cannot contain a message body!
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item)
  };
};
