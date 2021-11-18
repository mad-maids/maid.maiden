import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = {
      message: "Hello",
    };
  })
  .get("/something/:id", (ctx) => {
    const path = ctx.params.id;
    const jsonFile = Deno.readTextFileSync("data.json");
    ctx.response.body = {
      message: "Something",
    };
  });

export default router;
