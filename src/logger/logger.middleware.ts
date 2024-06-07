// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import logger from '@lib/utils/logger.utils';

// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const { method, originalUrl, body } = req;
//     const message = `[${method}] ${originalUrl} - ${JSON.stringify(body)}`;
//     logger.info(message);

//     next();
//   }
// }
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from '@lib/utils/logger.utils';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const endTime = Date.now();
      const duration = endTime - startTime;
      const message = `[${method}] ${originalUrl} - ${JSON.stringify(
        body,
      )} [${statusCode}] - ${duration}ms`;
      logger.info(message);
    });

    next();
  }
}
