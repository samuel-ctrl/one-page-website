import React, { useEffect } from 'react';

const AdBanner = () => {

    useEffect(() => {
      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, []);

  return (
    <div className="ad-banner">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4005409526739627"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4005409526739627"
        data-ad-slot="9126958660"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;