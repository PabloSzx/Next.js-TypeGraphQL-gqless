import "isomorphic-unfetch";

import { NextPage } from "next";
import { AppProps } from "next/app";
import ssrPrepass from "react-ssr-prepass";

const MyApp: NextPage<AppProps, {}> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async ({ AppTree, ...pageProps }) => {
  await ssrPrepass(<AppTree pageProps={pageProps} />);

  return {};
};

export default MyApp;
