/* ---------- External ---------- */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

/* ---------- Config ---------- */
import { secret_key } from '../config';

/* ---------- Utils ---------- */
import { logger } from '../utils/logs';

/* ---------- Custom Request Type ---------- */
interface AuthenticatedRequest extends Request {
  body: {
    user_id?: string;
  };
}

const authentication_middleware: RequestHandler = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
): Promise<void> | void => {
  try {
    const token = request.headers.authorization;

    logger.debug('Token [authentication_middleware]: ' + token);

    if (!token) {
      response.status(401).json({
        code: '401',
        message: 'Unauthorized',
      });

      return;
    }

    const [, token_value] = token.split(' ');

    const decoded = jwt.verify(token_value, secret_key) as JwtPayload;

    logger.debug(
      'Token decoded [authentication_middleware]: ' +
        JSON.stringify(decoded, null, 2),
    );

    request.body.user_id = decoded.user_id;

    next();
  } catch (error) {
    response.status(401).json({
      code: '401',
      message: 'Unauthorized',
    });
  }
};

export { authentication_middleware };
