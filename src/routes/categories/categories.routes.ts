/* ---------- External ---------- */
import { Router, Request, Response, NextFunction } from 'express';

/* ---------- Logs ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Middlewares ---------- */
import { authentication_middleware } from '../../common/middlewares/authentication.middleware';

/* ---------- Controllers ---------- */
import { categories_controller } from '../../controllers/categories/index.controller';

/* ---------- Objects instances ---------- */
const categories_routes = Router();

/** ----------
 * @description: This route is used to get a list of categories
 * @method: GET
 * @name: /categories
 * ---------- */
categories_routes.get(
  '/categories',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /categories');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await categories_controller.get_all_categories(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description: This route is used to register a new user
 * @method: POST
 * @name: /authentication
 * ---------- */
categories_routes.post(
  '/categories',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /categories');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await categories_controller.create_category(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { categories_routes };
