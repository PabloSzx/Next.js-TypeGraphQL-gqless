import "isomorphic-unfetch";

import App from "next/app";

// import { SuspenseWrap } from "@src/utils/SuspenseWrap";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      //<SuspenseWrap fallback={null}>
      <Component {...pageProps} />
      //</SuspenseWrap>
    );
  }
}

export default MyApp;
