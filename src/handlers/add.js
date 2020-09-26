import { success, failure } from '../../libs/response-lib';
import { BadRequestError } from "../../libs/errors";
import RecipesRepository from '../db/repositories/recipes';
import { v4 as uuidv4 } from 'uuid';
import Logger from "../../libs/logger";

const AWS = require("aws-sdk");
const logger = new Logger();

AWS.config.update({
  region: "us-east-1",
});

const generateRecipeId = () => uuidv4();

const handler = async (event) => {
  const eventBody = event.body && JSON.parse(event.body);
  logger.log('info', `Called lambda with event: ${JSON.stringify(eventBody)}` );
  const author = eventBody.author;
  const recipe = eventBody.recipe;
  try {
    if (!author || !recipe) {
      throw new BadRequestError();
    }
    const recipeRepository = new RecipesRepository();
    const recipeId = generateRecipeId();
    logger.log('info', `Generated recipeId: ${recipeId}` );
    const recipeResponse = await recipeRepository.updateOrCreate(recipeId, author, recipe);
    logger.log('info', `Recipe response: ${JSON.stringify(recipeResponse)}` );
    return success(recipeResponse);
  } catch (error) {
    return failure(error, error.statusCode);
  }
};

export { handler };
