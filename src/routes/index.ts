/* ---------- External ---------- */
import { Router } from 'express';

/* ---------- Routes ---------- */
import { authentication_routes } from './authentication/authentication.routes';

const routes = Router();

routes.use(authentication_routes);

export { routes };
