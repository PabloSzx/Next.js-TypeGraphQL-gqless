import { NextPage } from "next";
import React, { useEffect } from "react";

import { query } from "@gql";

import { graphql } from "../gqlessreact/dist";

const IndexPage: NextPage = () => {
  useEffect(() => {
    setTimeout(() => {
      query.helloWorld({ xd: "123" }).asd += "zxc";
    }, 4000);
  }, []);
  return <div>{query.helloWorld({ xd: "123" }).asd}</div>;
};

export default graphql(IndexPage, {
  suspense: false
});
