/* ---------- External ---------- */
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

/* ---------- Config ---------- */
import { secret_key } from '../config';

/* ---------- Utils ---------- */
import { logger } from '../utils/logs';

const authentication = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const token = request.headers.authorization;

    logger.debug('Token [authentication_middleware]:', token);

    if (!token) {
      return response.status(401).json({
        code: '401',
        message: 'Unauthorized',
      });
    }

    const [, token_value] = token.split(' ');

    const decoded = jwt.verify(token_value, secret_key) as JwtPayload;

    logger.debug('Token decoded [authentication_middleware]:', decoded);

    request.body.user_id = decoded.user_id;
    request.body.role = decoded.role;

    return next();
  } catch (error) {
    return response.status(401).json({
      code: '401',
      message: 'Unauthorized',
    });
  }
};

export { authentication };
