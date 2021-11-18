import { Context, Router } from "../deps.ts";

const router = new Router();

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
