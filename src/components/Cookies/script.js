const Cookies = (props) => {
    <>
    !props.cookiesAccepted && (
            <div className="cookie-consent">
                <p>We use cookies to enhance your experience:</p>
                <ul>
                    <li>Operate the wheel</li>
                    <li>Serve personalized ads</li>
                    <li>Analyze traffic</li>
                </ul>
                <button onClick={props.acceptCookies}>Accept Cookies</button>
                <a href="#privacy-policy">Learn More</a>
            </div>
        )
    </>
}

export default Cookies;