import { dynamodbClient } from '../../libs/dynamodb-config';
class Repository {
  constructor() {
    this.client = dynamodbClient;
  }
}

export default Repository;
