import { Context, Router } from "../deps.ts";
import {
    getAvailableTimetables,
    getAvailableIntranet,
    getTimetable,
    getIntranet,
    getGroups,
} from "../utils/files.ts"
const router = new Router();

router.get('/', async (ctx: Context) => {
    ctx.response.body = {
        intranet: '/intranet',
        timetable: '/timetable',
        confession: '/confession',
    };
});

router.get('/timetable', async (ctx: Context) => {
    const types = await getGroups('timetable');
    ctx.response.body = {
        types,
    };
});

router.get('/timetable/:type', async (ctx) => {
    const { type } = ctx.params;
    try {
        ctx.response.body = await getAvailableTimetables(type);
    } catch (e) {
        ctx.response.status = 404;
        const availableTypes = await getGroups('timetable');
        ctx.response.body = {
            error: e.message,
            availableTypes,
        };
    }
});

router.get('/timetable/:type/all', async (ctx) => {
    try {
        // @ts-ignore
        const { ...params } = ctx.params.query;
        const { type } = ctx.params;
        const entities = await getAvailableTimetables(type);

        if (!entities) return;

        const entityObjects = await Promise.all(
            entities.map(async (id) => {
                return await getTimetable(type, id);
            }),
        );

        ctx.response.body = entityObjects.filter((entity) => {
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
        ctx.response.status = 404;
        ctx.response.body = { error: e.message };
    }
});

router.get('/timetable/:type/:id', async (ctx) => {
    try {
        const { type, id } = ctx.params;

        ctx.response.body = await getTimetable(type, id);
    } catch (e) {
        ctx.response.status = 404;
        ctx.response.body = { error: e.message };
    }
});

router
  .get("/", (ctx: Context) => {
    ctx.response.body = {
      message: "Hello",
    };
  })
  .get("/something/:id", (ctx: Context) => {
    ctx.response.body = {
      message: "Something",
    };
  });

export default router;
