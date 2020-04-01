import "isomorphic-unfetch";

import { NextPage } from "next";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { FC, Suspense } from "react";

const fallback = <>Loading...</>;

const SuspenseComp: FC = ({ children }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
const SuspenseWrapper = dynamic(async () => SuspenseComp, {
  ssr: false
});

const MyApp: NextPage<AppProps, {}> = ({ Component, pageProps }) => {
  return (
    <SuspenseWrapper>
      <Component {...pageProps} />
    </SuspenseWrapper>
  );
};

export default MyApp;
