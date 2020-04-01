import { Arg, Mutation, Query, Resolver, Root } from "type-graphql";

import { SpecialType } from "../entities";

@Resolver()
export class TestResolver {
  @Query(() => SpecialType)
  async helloWorld(@Root() asd: any, @Arg("xd") xd: string) {
    console.log({
      asd
    });
    return {
      asd: "Hello world GQL" + xd
    };
  }

  @Mutation(() => String)
  async mutateHelloWorld(@Arg("asd") xd: string) {
    return "Hello World Mutation" + xd;
  }
}
