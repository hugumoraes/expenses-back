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
 * @description: This route is used to create a new category
 * @method: POST
 * @name: /categories
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

/** ----------
 * @description: This route is used to update a category
 * @method: PUT
 * @name: /categories
 * ---------- */
categories_routes.put(
  '/categories/:id',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint PUT /categories');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await categories_controller.update_category(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description: This route is used to delete a category
 * @method: DELETE
 * @name: /categories
 * ---------- */
categories_routes.delete(
  '/categories/:id',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint DELETE /categories');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await categories_controller.delete_category(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { categories_routes };
