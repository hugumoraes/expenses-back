/* ---------- External ---------- */
import { Router, Request, Response, NextFunction } from 'express';

/* ---------- Logs ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Middlewares ---------- */
import { authentication_middleware } from '../../common/middlewares/authentication.middleware';

/* ---------- Controllers ---------- */
import { transactions_controller } from '../../controllers/transactions/index.controller';

/* ---------- Objects instances ---------- */
const transactions_routes = Router();

/** ----------
 * @description:
 * @method: GET
 * @name: /transactions
 * ---------- */
transactions_routes.get(
  '/transactions',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /transactions');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await transactions_controller.get_all_transactions(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description: This route is used to create a new category
 * @method: POST
 * @name: /transactions
 * ---------- */
transactions_routes.post(
  '/transactions',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /transactions');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await transactions_controller.create_transaction(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description: This route is used to update a category
 * @method: PUT
 * @name: /transactions
 * ---------- */
// transactions_routes.put(
//   '/transactions/:id',
//   authentication_middleware,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       logger.info('Calling endpoint PUT /transactions');

//       logger.debug(`Params: ${JSON.stringify(request.params)}`);
//       logger.debug(`Query: ${JSON.stringify(request.query)}`);
//       logger.debug(`Body: ${JSON.stringify(request.body)}`);
//       logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

//       await categories_controller.update_category(request, response);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

/** ----------
 * @description: This route is used to delete a transaction
 * @method: DELETE
 * @name: /transactions
 * ---------- */
transactions_routes.delete(
  '/transactions/:transaction_id',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint DELETE /transactions');

      logger.debug(`Params: ${JSON.stringify(request.params)}`);
      logger.debug(`Query: ${JSON.stringify(request.query)}`);
      logger.debug(`Body: ${JSON.stringify(request.body)}`);
      logger.debug(`Headers: ${JSON.stringify(request.headers)}`);

      await transactions_controller.delete_transaction(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { transactions_routes };
