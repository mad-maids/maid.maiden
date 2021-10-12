import Koa from 'koa';
import koaBody from 'koa-body';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import chalk from 'chalk';

import { bot } from './modules/telegram';
import router from './routes';

(async () => {
  const app = new Koa();
  const port = process.env.PORT || 5000;

  app.use(koaBody());
  app.use(helmet());
  app.use(cors());

  await bot.telegram.setWebhook('https://maidens.herokuapp.com/telegram');
  app.use((ctx, next) =>
    ctx.method === 'POST' || ctx.url === '/telegram'
      ? // @ts-ignore
        bot.handleUpdate(ctx.request.body, ctx.response)
      : next(),
  );
  app.use(router.routes());

  app.listen(port, () => {
    console.log(
      chalk.blue('[API]'),
      'Running on',
      chalk.yellow(`0.0.0.0:${port}`),
    );
  });
})();
