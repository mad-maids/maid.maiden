import { bold, cyan, green, yellow } from "./deps.ts";
import { Application, Context, isHttpError, Status } from "./deps.ts";

import Router from "./router.ts";
import Response from "./response.ts";
import Error from "./error.ts";
import NotFound from "./notfound.ts";
import Logger from "./logger.ts";

const app = new Application();

// Logger | Response Time | Error handler
app.use(async (context, next) => await Logger(context, next));
app.use(async (context, next) => await Response(context, next));
app.use(async (context, next) => await Error(context, next));

await app.use(Router.routes());
await app.use(Router.allowedMethods());

// A basic 404 page
app.use(NotFound);

app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold("  using HTTP server: " + yellow(serverType)));
});

await app.listen({ port: 8080 });
console.log(bold("Finished."));
