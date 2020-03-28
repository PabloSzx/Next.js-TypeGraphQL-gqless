import "reflect-metadata";

import Fastify from "fastify";
import GQL from "fastify-gql";
import {
  RenderPageOptions,
  renderPlaygroundPage,
} from "graphql-playground-html";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Arg,
  buildSchemaSync,
  Field,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

const app = Fastify({
  logger: true
});

@ObjectType()
class SpecialType {
  @Field()
  asd: string;
}

@Resolver()
class TestResolver {
  @Query(() => SpecialType)
  async helloWorld(@Arg("xd") xd: string) {
    return {
      asd: "Hello world GQL" + xd
    };
  }
}

app.register(GQL, {
  schema: buildSchemaSync({
    resolvers: [TestResolver]
  }),
  jit: 1,
  path: "/api/graphql"
});

const playgroundOptions: RenderPageOptions = {};

app.get("*", (_req, res) => {
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
