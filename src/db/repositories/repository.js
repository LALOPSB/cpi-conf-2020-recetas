import { dynamodbClient } from '../../libs/dynamodb-config';
import { testDynamodbClient } from '../../../tests/libs/test-dynamodb-config';
class Repository {
  constructor() {
    this.client = this.defineStageDynamodbClient();
  }

  defineStageDynamodbClient() {
    return process.env.stage === ('dev' || 'prod' || 'review') ? dynamodbClient : testDynamodbClient;
  }
}

export default Repository;
