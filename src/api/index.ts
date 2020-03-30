import "reflect-metadata";

import Fastify from "fastify";
import GQL from "fastify-gql";
import {
  RenderPageOptions,
  renderPlaygroundPage,
} from "graphql-playground-html";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchemaSync } from "type-graphql";

import * as resolvers from "./resolvers";

const app = Fastify({
  logger: true
});

app.register(GQL, {
  schema: buildSchemaSync({
    resolvers: Object.values(resolvers) as any
  }),
  jit: 1,
  path: "/api/graphql",
  routes: true,
  graphiql: false,
  ide: false
});

const playgroundOptions: RenderPageOptions = {
  endpoint: "/api/graphql"
};

app.get("/api/playground", (req, res) => {
  res.type("text/html");
  res.send(renderPlaygroundPage(playgroundOptions));
});

const isReady = new Promise((resolve, reject) =>
  app
    .ready()
    .then(() => resolve())
    .catch(reject)
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await isReady;

  app.server.emit("request", req, res);
};

export const config = {
  api: {
    bodyParser: false,
    externalServer: true
  }
};
