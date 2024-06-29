import React, { ReactNode, Suspense } from "react";
import AdUnitClient from "./ad-unit-client";

type Props = {
  children: ReactNode;
};

const isProduction = process.env.NODE_ENV === "production";

const AdUnit = ({ children }: Props) => {
  return (
    <Suspense>
      {isProduction ? <AdUnitClient>{children}</AdUnitClient> : <>{children}</>}
    </Suspense>
  );
};

export default AdUnit;
