/* ---------- External ---------- */
import { Router, Request, Response, NextFunction } from 'express';

/* ---------- Logs ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Controllers ---------- */
import { users_controller } from '../../controllers/users/index.controller';

/* ---------- Objects instances ---------- */
const authentication_routes = Router();

/** ----------
 * @description: This route is used to authenticate a user
 * @method: GET
 * @name: /authentication
 * ---------- */
authentication_routes.get(
  '/authentication',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /authentication');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await users_controller.authenticate_user(request, response);
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
authentication_routes.post(
  '/authentication',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /authentication');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await users_controller.register_user(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { authentication_routes };
