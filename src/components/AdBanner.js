import React from 'react';

const AdBanner = () => {
  return (
    <div className="ad-banner">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4005409526739627" crossorigin="anonymous"></script>
      <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-4005409526739627">
      </amp-auto-ads>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="YOUR_AD_CLIENT_ID"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
};

export default AdBanner;