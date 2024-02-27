const AWS = require('aws-sdk');
const { v4 } = require('uuid');

module.exports.handler = async event => {
  console.log('Event=', event);

  const body = JSON.parse(event.body);

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      id: v4(),
      name: body.name,
      email: body.email
    }
  };

  await dynamodb.put(putParams).promise();

  console.log('New customer created');

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'New customer has been created' })
  };
};
