import React from "react";

import { query } from "@gql";
import { graphql } from "@pablosz/gqless-react";

export default graphql(
  () => {
    return <div>{query.helloWorld({ xd: "123123" }).asd}</div>;
  },
  {
    suspense: false
  }
);
