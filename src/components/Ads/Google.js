import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const AdBanner = () => {
  const adContainer = useRef(null);
  const [showFallbackAd, setShowFallbackAd] = useState(false);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (window.adsbygoogle) {
          // If ad container exists and has no children, try to load the ad
          if (adContainer.current && adContainer.current.children.length === 0) {
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
            
            // Set a timeout to check if the ad loaded
            const timeout = setTimeout(() => {
              if (adContainer.current.innerHTML.trim() === '') {
                setShowFallbackAd(true);
              }
            }, 2000); // Check after 2 seconds if ad didn't load
            
            return () => clearTimeout(timeout);
          }
        } else {
          // If adsbygoogle is not available, show fallback immediately
          setShowFallbackAd(true);
        }
      } catch (e) {
        console.error("AdSense error:", e);
        setShowFallbackAd(true);
      }
    };

    loadAd();
  }, []);

  return (
    <div className="ad-banner ad-container">
      {showFallbackAd ? (
        <div className="dummy-ad">
          <div className="dummy-ad-content">
            <h3>Advertisement</h3>
            <p>Your ad could be here</p>
            <div className="dummy-ad-placeholder"></div>
            <small>This is a placeholder for Google Ads</small>
          </div>
        </div>
      ) : (
        <div ref={adContainer}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-4005409526739627"
            data-ad-slot="9126958660"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      )}
    </div>
  );
};

export default AdBanner;