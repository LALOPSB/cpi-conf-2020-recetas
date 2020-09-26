import { dynamodb } from "./test-dynamodb-config";
import Logger from "../../libs/logger";

const logger = new Logger()

export async function createTable(tableName, primaryKeyName){
  const params = {
    TableName : tableName,
    KeySchema: [
      { AttributeName: primaryKeyName, KeyType: "HASH"}
    ],
    AttributeDefinitions: [
      { AttributeName: primaryKeyName, AttributeType: "S" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };
  await dynamodb.createTable(params).promise()
    .then(data => logger.log('info', `Created table. Table description JSON: ${JSON.stringify(data.TableDescription.AttributeDefinitions[0], null, 2)}`))
    .catch(err => logger.log('info', `Unable to create table. Error JSON: ${JSON.stringify(err.message, null, 2)}`))
}

export async function deleteTable(tableName) {
  await dynamodb.deleteTable( { TableName: tableName }).promise()
  .then(data => logger.log('info', `Deleted table. Table description JSON: ${JSON.stringify(data.TableDescription.AttributeDefinitions[0], null, 2)}`))
  .catch(err => logger.log('info', `Unable to delete table. Error JSON: ${JSON.stringify(err.message, null, 2)}`))
}
