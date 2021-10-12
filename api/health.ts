import type { APIHandler } from "aleph/types.d.ts";

const check = async (link: string) => {
  const req = await fetch("http://api.d.maid.uz").then((req) => req.status);
  return req;
};

export const handler: APIHandler = ({ response }) => {
  response.json({
    d: check("http://api.d.maid.uz"),
    n: check("http://api.n.maid.uz"),
  });
};
