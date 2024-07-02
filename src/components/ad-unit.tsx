import React, { ReactNode, Suspense } from "react";
import AdUnitClient from "./ad-unit-client";
import { Card } from "./ui/card";

type Props = {
  children: ReactNode;
};

const isProduction = process.env.NODE_ENV === "production";

const AdUnit = ({ children }: Props) => {
  return (
    <Suspense>
      {/* {isProduction ? <AdUnitClient>{children}</AdUnitClient> : <>{children}</>} */}
      <AdUnitClient>{children}</AdUnitClient>
    </Suspense>
  );
};

export default AdUnit;

export function InArticleAd({ className }: { className?: string }) {
  return (
    <div className={className}>
      <AdUnit>
        <ins
          className="adsbygoogle"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID!}
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-slot="8920257026"
        ></ins>
      </AdUnit>
    </div>
  );
}

export function DisplayAdUnit({
  className,
  format,
}: {
  className?: string;
  format?: string;
}) {
  return (
    <div className={className}>
      <AdUnit>
        <ins
          className="adsbygoogle"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID!}
          style={{ display: "block" }}
          data-ad-slot="6759868245"
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </AdUnit>
    </div>
  );
}

export function InFeedAdUnit({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <AdUnit>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID!}
          data-ad-format="fluid"
          data-ad-layout-key="-f9+5v+4m-d8+7b"
          data-ad-slot="3384843406"
        ></ins>
      </AdUnit>
    </Card>
  );
}
