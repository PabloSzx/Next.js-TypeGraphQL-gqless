import "isomorphic-unfetch";

import App, { AppContext } from "next/app";
import ssrPrepass from "react-ssr-prepass";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const pageProps = await App.getInitialProps(appContext);

  console.log(17, { pageProps });
  await ssrPrepass(<appContext.AppTree pageProps={pageProps} />);

  return pageProps;
};

export default MyApp;
