import React, { useEffect, useRef } from 'react';
import './styles.css';

const AdBanner = () => {
  const adContainer = useRef(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        if (adContainer.current && adContainer.current.children.length === 0) {
          window.adsbygoogle.push({});
        }
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="ad-banner ad-container" ref={adContainer}>
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