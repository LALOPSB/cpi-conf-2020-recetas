const AWS = require("aws-sdk");

export const dynamodb = new AWS.DynamoDB();

export const dynamodbClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
