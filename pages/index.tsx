import React from "react";

import { query } from "@gql";
import { graphql } from "@gqless/react";

export default graphql(() => {
  return <div>{query.helloWorld({ xd: "123123" }).asd}</div>;
});
