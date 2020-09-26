const AWS = require("aws-sdk");

if (['dev','prod','review'].includes(process.env.stage)) {
  AWS.config.update({
    region: "us-east-1",
  });
}

export const dynamodb = new AWS.DynamoDB();

export const dynamodbClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
