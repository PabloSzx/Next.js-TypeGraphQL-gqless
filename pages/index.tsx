import React from "react";

import { query, useMutation } from "@gql";
import { graphql } from "@pablosz/gqless-react";

export default graphql(
  () => {
    const [mutation, { state, data }] = useMutation(schema =>
      schema.mutateHelloWorld({
        asd: "zxc"
      })
    );

    return (
      <div>
        <p>{query.helloWorld({ xd: "123123" }).asd}</p>
        <p>
          mutation
          <br />
          <button
            onClick={async () => {
              const data = await mutation();
              console.log({
                data
              });
            }}
          >
            Do Mutation
          </button>
          <br />
          {data}
          <br />
          {state}
        </p>
      </div>
    );
  },
  {
    suspense: true
  }
);
