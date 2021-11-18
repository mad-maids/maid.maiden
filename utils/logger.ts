import { bold, Context, cyan, green } from "../deps.ts";

export default async (context: Context, next: any) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(
    `${green(context.request.method)} ${
      cyan(decodeURIComponent(context.request.url.pathname))
    } - ${
      bold(
        String(rt),
      )
    }`,
  );
};
