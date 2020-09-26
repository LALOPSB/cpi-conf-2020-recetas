import {success, failure} from '../../libs/response-lib';
import RecipesRepository from '../db/repositories/recipes';
import Logger from "../../libs/logger";

const AWS = require("aws-sdk");
const logger = new Logger();

AWS.config.update({
  region: "us-east-1",
});

const formatRecipeResponse = (response) => {
  return { 'recipe': response.Item.recipe, 'author': response.Item.author };
};

const handler = async () => {
  logger.log('info', `Returning random recipe` );
  try {
    const recipesRepository = new RecipesRepository();
    const response = await recipesRepository.getRandom();
    logger.log('info', `Recipe response: ${JSON.stringify(response)}` );
    return success(formatRecipeResponse(response));
  } catch (error) {
    return failure(error, error.statusCode);
  }
};

export { handler };
