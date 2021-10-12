import Router from 'koa-router';
import {
  getAvailableTimetables,
  getAvailableIntranet,
  getTimetable,
  getIntranet,
  getGroups,
} from '../modules/filesystem';
import { sendMessage } from '../modules/telegram';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    intranet: 'http://api.n.maid.uz/intranet',
    timetable: 'http://api.n.maid.uz/timetable',
  };
});

router.get('/timetable', async (ctx) => {
  const types = await getGroups('timetable');
  ctx.body = {
    types,
  };
});

router.get('/timetable/:type', async (ctx) => {
  const { type } = ctx.params;
  try {
    ctx.body = await getAvailableTimetables(type);
  } catch (e) {
    ctx.status = 404;
    const availableTypes = await getGroups('timetable');
    ctx.body = {
      error: e.message,
      availableTypes,
    };
  }
});

router.get('/timetable/:type/all', async (ctx) => {
  try {
    const { ...params } = ctx.query;
    const { type } = ctx.params;
    const entities = await getAvailableTimetables(type);

    if (!entities) return;

    const entityObjects = await Promise.all(
      entities.map(async (id) => {
        return await getTimetable(type, id);
      }),
    );

    ctx.body = entityObjects.filter((entity) => {
      for (const key of Object.keys(params)) {
        const value = entity[key];

        switch (typeof value) {
          case 'string':
            if (!value.includes(<string>params[key])) return false;
            break;
          default:
            if (value != params[key]) return false;
            break;
        }
      }

      return true;
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = { error: e.message };
  }
});

router.get('/timetable/:type/:id', async (ctx) => {
  try {
    const { type, id } = ctx.params;

    ctx.body = await getTimetable(type, id);
  } catch (e) {
    ctx.status = 404;
    ctx.body = { error: e.message };
  }
});

router.get('/intranet', async (ctx) => {
  const types = await getGroups('intranet');
  ctx.body = {
    types,
  };
});

router.get('/intranet/:type', async (ctx) => {
  const { type } = ctx.params;
  try {
    ctx.body = await getAvailableIntranet(type);
  } catch (e) {
    ctx.status = 404;
    const availableTypes = await getGroups('intranet');
    ctx.body = {
      error: e.message,
      availableTypes,
    };
  }
});

router.get('/intranet/:type/all', async (ctx) => {
  try {
    const { ...params } = ctx.query;
    const { type } = ctx.params;
    const entities = await getAvailableIntranet(type);

    if (!entities) return;

    const entityObjects = await Promise.all(
      entities.map(async (id) => {
        return await getIntranet(type, id);
      }),
    );

    ctx.body = entityObjects.filter((entity) => {
      for (const key of Object.keys(params)) {
        const value = entity[key];

        switch (typeof value) {
          case 'string':
            if (!value.includes(<string>params[key])) return false;
            break;
          default:
            if (value != params[key]) return false;
            break;
        }
      }

      return true;
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = { error: e.message };
  }
});

router.get('/intranet/:type/:id', async (ctx) => {
  try {
    const { type, id } = ctx.params;

    ctx.body = await getIntranet(type, id);
  } catch (e) {
    ctx.status = 404;
    ctx.body = { error: e.message };
  }
});

router.get('/confession/:message', async (ctx) => {
  const { message } = ctx.params;
  try {
    await sendMessage(message);
    ctx.body = { status: 'sent', message: message };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      error: e.message,
    };
  }
});

export default router;
