/* ---------- External ---------- */
import express from 'express';
import cors from 'cors';
import swagger from 'swagger-ui-express';

/* ---------- Helpers ---------- */
import { logger } from './common/utils/logs';

/* ---------- Routes ---------- */
import { routes } from './routes';

/* ---------- Docs ---------- */
import swaggerFile from './docs/swagger.json';

/* ---------- Helpers constants ---------- */
const port = 3333;

/**
 * Manages NodeJS server settings.
 *  ---------- */
const app = express();

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(cors());

/* ---------- Docs Routes ---------- */
app.use('/docs', swagger.serve, swagger.setup(swaggerFile));
logger.warn('Docs available at http://localhost:3333/docs');

/* ---------- Routes ---------- */
app.use(routes);

/* ---------- Server start ---------- */
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
