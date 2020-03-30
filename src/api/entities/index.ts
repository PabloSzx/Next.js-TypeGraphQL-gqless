import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SpecialType {
  @Field()
  asd: string;
}
