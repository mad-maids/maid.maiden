import Router from '~/router.ts'
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
app.use(Router.routes());
app.use(Router.allowedMethods());

app.listen({ port: 8080 });
