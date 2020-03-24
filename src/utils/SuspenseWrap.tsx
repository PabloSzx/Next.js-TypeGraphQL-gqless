import { FC, Suspense, useEffect, useState } from "react";

export const SuspenseWrap: FC<{ fallback?: JSX.Element }> = ({
  children,
  fallback = null
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, [setReady]);

  if (ready && typeof window !== "undefined") {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }

  return <>{children}</>;
};
