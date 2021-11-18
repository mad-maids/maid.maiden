import { bold, yellow } from "./deps.ts";
import { Application } from "./deps.ts";

import Router from "./routes/mod.ts";
import Response from "./utils/response.ts";
import Error from "./utils/error.ts";
import NotFound from "./utils/notfound.ts";
import Logger from "./utils/logger.ts";

const app = new Application();

// Logger | Response Time | Error handler
app.use(async (context, next) => await Logger(context, next));
app.use(async (context, next) => await Response(context, next));
app.use(async (context, next) => await Error(context, next));

app.use(Router.routes());
app.use(Router.allowedMethods());

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
