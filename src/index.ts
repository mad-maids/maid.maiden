import Koa from 'koa';
import koaBody from 'koa-body';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import chalk from 'chalk';

import router from './routes';

(async () => {
  const app = new Koa();
  const port = process.env.PORT || 5000;

  app.use(koaBody());
  app.use(helmet());
  app.use(cors());

  app.use(router.routes());

  app.listen(port, () => {
    console.log(
      chalk.blue('[API]'),
      'Running on',
      chalk.yellow(`0.0.0.0:${port}`),
    );
  });
})();
