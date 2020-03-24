import { NextPage } from "next";
import React from "react";

import { query } from "@gql";

import { graphql } from "../gqlessreact/dist";

const IndexPage: NextPage = () => {
  return <div>{query.helloWorld({ xd: "123123" }).asd}</div>;
};

IndexPage.getInitialProps = async () => {
  return {};
};

export default graphql(IndexPage);
