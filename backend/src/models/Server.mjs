import cors from 'cors';
import express, { json } from 'express';
import { Server as HTTPServer } from 'http';

import config from '../config/index.mjs';
import { routerApi } from '../api/routes/index.mjs';
import { errorHandler } from '../api/middlewares/error.handler.mjs';
import { routeHandler } from '../api/middlewares/route.handler.mjs';

export class Server {

  constructor() {
    this.port = config.port;
    this.app = express();
    this.httpServer = new HTTPServer(this.app);
  }

  middlewares() {
    this.app.use(cors({origin: '*'}));
    this.app.use(json());
    routerApi(this.app);
    this.app.use(errorHandler);
    this.app.use(routeHandler);
  }

  async listen() {
    return new Promise(resolve => {
      this.middlewares();
      this.httpServer?.listen(this.port, () => {
        console.info('HTTP server connected');
        console.log(`Server running on: http://localhost:${config.port}`);
      })
      resolve();
    })
  }
}