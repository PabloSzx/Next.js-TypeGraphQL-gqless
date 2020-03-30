import { Arg, Query, Resolver } from "type-graphql";

import { SpecialType } from "../entities";

@Resolver()
export class TestResolver {
  @Query(() => SpecialType)
  async helloWorld(@Arg("xd") xd: string) {
    return {
      asd: "Hello world GQL" + xd
    };
  }
}
