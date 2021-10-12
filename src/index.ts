import Koa from 'koa';
import koaBody from 'koa-body';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import chalk from 'chalk';
import redis from 'redis';
import router from './routes';
import { ratelimit } from 'koa-simple-ratelimit';
import bot from './modules/telegram';
import safeCompare from 'safe-compare';
import { redis_url } from "./config";

(async () => {
  const app = new Koa();
  const port = process.env.PORT || 5000;

  app.use(koaBody());

  // Telegram Bot
  const secretPath = `/telegraf/${bot.secretPathComponent()}`;
  await bot.telegram.setWebhook(`https://maidens.herokuapp.com${secretPath}`);
  app.use(async (ctx, next) => {
    if (safeCompare(secretPath, ctx.url)) {
      await bot.handleUpdate(ctx.request.body);
      ctx.status = 200;
      return;
    }
    return next();
  });

  app.use(helmet());
  app.use(cors());
  app.use(
    ratelimit({
      // @ts-ignore
      db: redis.createClient(redis_url),
      duration: 60000,
      max: 100,
    }),
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
