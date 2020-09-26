const AWS = require("aws-sdk");

if (!['dev','prod','review'].includes(process.env.stage)) {
  AWS.config.update({
    region: "us-east-1",
    endpoint: 'http://localhost:8000',
    accessKeyId: "anAccessKeyId",
    secretAccessKey: "aSecretAccessKey"
  });
}

export const dynamodb = new AWS.DynamoDB();

export const testDynamodbClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
