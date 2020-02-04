/*
 * Description: Create middleware to serve static files without hitting the route hangler
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Injectable()
export class ServeHTMLMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    //if requested path is api endpoint, skip

    if (
      req.path.includes('getbetas') ||
      req.path.includes('initconnect') ||
      req.path.includes('updateconnect')
    ) {
      return next();
    } else if (req.path.includes('/public/')) {
      res.sendFile(join(process.cwd(), 'src/', req.path));
    } else if (req.path.includes('/')) {
      // change the path to the correct html page path in your project
      res.sendFile(join(process.cwd(), '/src/views/index.html'));
    }
  }
}
