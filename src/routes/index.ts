/* ---------- External ---------- */
import { Router } from 'express';

/* ---------- Routes ---------- */
import { authentication_routes } from './authentication/authentication.routes';
import { categories_routes } from './categories/categories.routes';
import { transactions_routes } from './transactions/transactions.routes';

const routes = Router();

routes.use(authentication_routes);
routes.use(categories_routes);
routes.use(transactions_routes);

export { routes };
