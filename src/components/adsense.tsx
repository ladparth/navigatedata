import Script from "next/script";

export default function Adsense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process
        .env.NEXT_PUBLIC_ADSENSE_PUB_ID!}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    ></Script>
  );
}
