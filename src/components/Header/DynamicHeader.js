import { useState, useEffect, useRef } from 'react';
import './DynamicHeader.css';

const DynamicHeader = () => {
  const [activeMode, setActiveMode] = useState('luckyWheel');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const modes = {
    luckyWheel: {
      title: "Lucky Wheel",
      subtitle: "Spin to Win Exciting Rewards",
      description: "Experience the thrill of chance with our dynamic spinning wheel. Perfect for games, promotions, and interactive events!",
      features: [
        "🎯 Randomized outcomes",
        "🎨 Customizable themes",
        "📱 Cross-device compatibility",
        "🎉 Risk-free entertainment"
      ],
      icon: "🎡"
    },
    oneToOneChat: {
      title: "Private Chat",
      subtitle: "Secure Direct Messaging",
      description: "Instant encrypted communication platform with real-time message synchronization and file sharing capabilities.",
      features: [
        "🔒 Military-grade encryption",
        "💬 Message history",
        "📁 Media sharing",
        "👤 Personalized profiles"
      ],
      icon: "💬"
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const switchMode = (mode) => {
    if (modes[mode]) {
      setActiveMode(mode);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="dynamic-header">
      <div className="header-content">
        <div className="title-group">
          <h1 className="main-title">
            <span className="mode-icon">{modes[activeMode].icon}</span>
            {modes[activeMode].title}
          </h1>
          <p className="subtitle">{modes[activeMode].subtitle}</p>
        </div>

        <div className="mode-selector" ref={dropdownRef}>
          <button 
            className={`dropdown-toggle ${isDropdownOpen ? 'active' : ''}`}
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <span className="current-mode">
              {modes[activeMode].icon} {modes[activeMode].title}
            </span>
            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </span>
          </button>
          
          <div className={`dropdown-menu ${isDropdownOpen ? 'visible' : ''}`}>
            {Object.entries(modes).map(([key, mode]) => (
              <button
                key={key}
                className={`mode-option ${activeMode === key ? 'selected' : ''}`}
                onClick={() => switchMode(key)}
                role="option"
                aria-selected={activeMode === key}
              >
                <span className="option-icon">{mode.icon}</span>
                <div className="option-details">
                  <span className="option-title">{mode.title}</span>
                  <span className="option-subtitle">{mode.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="context-section">
        <div className="context-container">
          <p className="context-description">{modes[activeMode].description}</p>
          <ul className="feature-grid">
            {modes[activeMode].features.map((feature, index) => (
              <li key={index} className="feature-card">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </header>
  );
};

export default DynamicHeader;