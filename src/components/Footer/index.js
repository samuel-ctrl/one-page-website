const Footer = () => {

return (
    <footer className="legal-sections">
        <section id="privacy-policy">
          <h2>Privacy Policy</h2>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h3>Data Collection</h3>
          <p>We may collect:</p>
          <ul>
            <li>Non-personal identification through cookies</li>
            <li>IP addresses for security and analytics</li>
            <li>Interaction data with the wheel</li>
          </ul>

          <h3>Google AdSense</h3>
          <p>Third-party vendors including Google use cookies to serve ads based on:</p>
          <ul>
            <li>User's prior visits to this website</li>
            <li>Interest-based advertising</li>
          </ul>
          <p>Users may opt out through <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></p>

          <h3>Children's Privacy</h3>
          <p>This site does not target users under 13. We do not knowingly collect personal information from children.</p>

          <h3>Your Rights</h3>
          <p>Under data protection laws, you may request:</p>
          <ul>
            <li>Access to your data</li>
            <li>Data deletion</li>
            <li>Opt-out of data collection</li>
          </ul>
          <p>Contact: contact@example.com</p>
        </section>

        <section id="terms">
          <h2>Terms of Service</h2>
          <h3>Acceptance</h3>
          <p>By using Lucky Wheel Game, you agree to these terms.</p>

          <h3>User Responsibilities</h3>
          <ul>
            <li>No automated scripts or bots</li>
            <li>No reverse engineering of the game</li>
            <li>No illegal activities</li>
          </ul>

          <h3>Limitations</h3>
          <p>This is an entertainment product only:</p>
          <ul>
            <li>No real-money value</li>
            <li>No gambling or real stakes</li>
            <li>Results are randomly generated</li>
          </ul>

          <h3>Changes to Terms</h3>
          <p>We may update these terms periodically</p>
        </section>

        <section id="disclaimer">
          <h2>Disclaimer</h2>
          <p>This is a entertainment product:</p>
          <ul>
            <li>No real-world value</li>
            <li>Not gambling-related</li>
            <li>No financial risks/rewards</li>
          </ul>
        </section>

        <div className="legal-links">
          <a href="#privacy-policy">Privacy Policy</a> | 
          <a href="#terms">Terms of Service</a> | 
          <a href="#disclaimer">Disclaimer</a>
        </div>
        
      </footer>
    );
}


export default Footer; 