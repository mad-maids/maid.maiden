import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = {
      message: "Hello"
    };
  })
  .get("/", (ctx) => {

  })


export default router;