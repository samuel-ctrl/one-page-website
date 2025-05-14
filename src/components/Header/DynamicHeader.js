import { useState, useRef, useEffect } from "react";
import "./DynamicHeader.css";
import { HeaderContext } from "./constant";
import useSimpleStore from "../../store/SimpleStore";
import Login from "../auth/BasicAuthenticator";

const DynamicHeader = () => {
  const { activeMode, setActiveMode, isAuthenticated, user } = useSimpleStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const switchMode = (mode) => {
    if (!HeaderContext[mode]) return;

    if (HeaderContext[mode].requiresAuth && !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setActiveMode(mode);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="dynamic-header">
      <div className="header-content">
        <div className="title-group">
          <h1 className="main-title">
            <span className="mode-icon">{HeaderContext[activeMode].icon}</span>
            {HeaderContext[activeMode].title}
          </h1>
          <p className="subtitle">{HeaderContext[activeMode].subtitle}</p>
        </div>

        <div className="header-right-section">
          {isAuthenticated ? (
            <div className="user-profile">
              <span className="user-name">{user.name}</span>
              <img
                src={user.avatar}
                alt="User avatar"
                className="user-avatar"
              />
            </div>
          ) : (
            <button
              className="login-button"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
          )}

          <div className="mode-selector" ref={dropdownRef}>
            <button
              className={`dropdown-toggle ${isDropdownOpen ? "active" : ""}`}
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <span className="current-mode">
                {HeaderContext[activeMode].icon}{" "}
                {HeaderContext[activeMode].title}
              </span>
              <span
                className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
              </span>
            </button>

            <div className={`dropdown-menu ${isDropdownOpen ? "visible" : ""}`}>
              {Object.entries(HeaderContext).map(([key, mode]) => (
                <button
                  key={key}
                  className={`mode-option ${activeMode === key ? "selected" : ""} ${
                    mode.requiresAuth && !isAuthenticated ? "disabled" : ""
                  }`}
                  onClick={() => switchMode(key)}
                  role="option"
                  aria-selected={activeMode === key}
                  disabled={mode.requiresAuth && !isAuthenticated}
                >
                  <span className="option-icon">{mode.icon}</span>
                  <div className="option-details">
                    <span className="option-title">
                      {mode.title}
                      {mode.requiresAuth && !isAuthenticated && (
                        <span className="auth-required-badge">Premium</span>
                      )}
                    </span>
                    <span className="option-subtitle">{mode.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="context-section">
        <div className="context-container">
          <p className="context-description">
            {HeaderContext[activeMode].description}
          </p>
          <ul className="feature-grid">
            {HeaderContext[activeMode].features.map((feature, index) => (
              <li key={index} className="feature-card">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <Login
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => setShowLoginModal(false)}
        />
      )}
    </header>
  );
};

export default DynamicHeader;
