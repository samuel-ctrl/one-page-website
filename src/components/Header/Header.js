import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="title-container">
          <h1 className="main-title">Lucky Wheel</h1>
          <p className="subtitle">Spin to Win Fun Prizes!</p>
        </div>
        
        <div className="ad-container">
          <a 
            href="https://beta.publishers.adsterra.com/referral/5pBNiTcQQj" 
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
            aria-label="Adsterra referral"
          >
            <img 
              className="ad-banner" 
              alt="Adsterra referral banner" 
              src="https://landings-cdn.adsterratech.com/referralBanners/gif/120x60_adsterra_reff.gif" 
              loading="lazy"
            />
          </a>
        </div>
      </div>

      <section className="intro-section">
        <h2 className="welcome-title">Welcome to Lucky Wheel</h2>
        <div className="description-container">
          <p className="description">
            Spin our interactive wheel for fun results! Discover your luck today with our 
            carefully designed segments. This entertainment platform provides random 
            outcomes for amusement purposes only.
          </p>
          <ul className="features-list">
            <li>🎯 100% random results</li>
            <li>🎨 Customizable segments</li>
            <li>📱 Mobile-friendly</li>
            <li>🆓 No real money involved</li>
          </ul>
        </div>
      </section>
    </header>
  );
};

export default Header;