import { FC, Suspense, SuspenseProps } from "react";

const isClientSide = typeof window !== "undefined";

export const SuspenseWrap: FC<SuspenseProps> = ({
  children,
  fallback,
  ...suspenseProps
}) => {
  if (isClientSide) {
    return (
      <Suspense fallback={fallback} {...suspenseProps}>
        {children}
      </Suspense>
    );
  }

  return <>{fallback}</>;
};
