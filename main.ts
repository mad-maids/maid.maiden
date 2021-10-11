import { Application, Router } from "https://deno.land/x/oak@9.0.1/mod.ts";

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Hello world!";
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
