import "reflect-metadata";

import express from "express";
import { createGraphqlMiddleware } from "express-gql";
import { NextApiHandler } from "next";
import {
  Arg,
  buildSchemaSync,
  Field,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

const app = express();

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

app.post(
  "*",
  createGraphqlMiddleware({
    schema: buildSchemaSync({
      resolvers: [TestResolver]
    })
  })
);

export default app;

export const config = {
  api: {
    externalServer: true
  }
};
