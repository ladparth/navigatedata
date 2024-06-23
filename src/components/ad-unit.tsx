"use client";

import { useEffect } from "react";

type AdUnitProps = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

export default function AdUnit({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}: AdUnitProps) {
  useEffect(() => {
    const loadAds = () => {
      try {
        const adSlots = document.querySelectorAll("ins.adsbygoogle");
        let allAdsLoaded = true;
        adSlots.forEach((slot) => {
          if (!slot.querySelector("iframe")) {
            allAdsLoaded = false;
          }
        });

        if (!allAdsLoaded) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e: any) {
        console.error(e.message);
      }
    };

    // Delay the ad loading to ensure all elements are properly initialized
    setTimeout(loadAds, 1000); // Adjust the delay as necessary
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
  );
}
