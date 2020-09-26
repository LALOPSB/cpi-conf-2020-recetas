import Repository from './repository';
import Logger from "../../../libs/logger";

const logger = new Logger();
const tableName = process.env.tableName || 'test-recipes';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomId = (ids) => {
    const index = getRandomInt(0, ids.length);
    return ids[index]['id'];
};

class RecipesRepository extends Repository {
  async updateOrCreate(recipeId, author, recipe) {
    await this.putToDynamo(recipeId, author, recipe);
  }

  async putToDynamo(recipeId, author, recipe) {
    let params = {
      TableName: tableName,
      Item: {"id": recipeId, "author": author, "recipe": recipe}
    };
    await this.client.put(params).promise()
      .then(logger.log('info', `PutItem succeeded: ${recipeId}`))
      .catch(err => logger.log('info', `Unable to put item. Error JSON: ${JSON.stringify(err, null, 2)}`));
  }

  async get(recipeId) {
    const params = {
      TableName: tableName,
      Key: {
        "id": recipeId
      }
    };
    return await this.client.get(params).promise()
      .catch((error) => {
        logger.log('error', `Error when trying to return recipe for id: ${recipeId}. Error: ${error}`);
        throw error;
      })
      .then(item => {
        logger.log('info', `Returning recipe for id: ${recipeId}`);
        return item;
      });
  }

  async getRandom() {
    const params = {
      TableName: tableName,
      ProjectionExpression: 'id'
    };
    return await this.client.scan(params).promise()
      .then(ids => {
        logger.log('info', `Retrieving ids`);
        return getRandomId(ids.Items);
      })
      .then(id => {
        logger.log('info', `Retrieving recipe for id: ${id}`);
        return this.get(id);
      })
      .catch((error) => {
        logger.log('error', `Error while retrieving random recipe`);
        throw error;
      });
  }
}

export default RecipesRepository;
