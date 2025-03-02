import { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState  ("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const signupUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        username,
        email,
        password
      });
      alert(response.data.message );
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed" );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleLogIn = () => {
    navigate("/login");
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="instagram-logo">Instagram</h1>
        <p className="signup-message">Sign up to see photos and videos from your friends.</p>

        <button className="facebook-button" aria-label="Log in with Facebook">
          <i className="fab fa-facebook"></i> Log in with Facebook
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {message && <p className={`message ${message.type}`}>{message.text}</p>}

        <form className="signup-form" onSubmit={signupUser}>
          <input
            type="email"
            name="email"
            placeholder="Mobile Number or Email"
            aria-label="Mobile Number or Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            aria-label="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <p className="terms-message">
            People who use our service may have uploaded your contact information to Instagram.
            <a href="https://www.facebook.com/help/instagram/261704639352628" target="_blank" rel="noopener noreferrer">Learn More</a>
          </p>

          <p className="policy-message">
            By signing up, you agree to our
            <a href="https://help.instagram.com/581066165581870/?locale=en_US" target="_blank" rel="noopener noreferrer"> Terms</a>,
            <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a> and
            <a href="https://privacycenter.instagram.com/policies/cookies/" target="_blank" rel="noopener noreferrer"> Cookies Policy</a>.
          </p>

          <button type="submit" className="signup-button" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>

      <div className="login-box">
        <p>Have an account? <a href="#" onClick={handleLogIn}>Log in</a></p>
      </div>

      <div className="get-app">
        <p>Get the app.</p>
        <div className="app-download-buttons">
          <a href="#" className="app-store-button">
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" alt="Download on the App Store" />
          </a>
          <a href="#" className="play-store-button">
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Get it on Google Play" />
          </a>
        </div>
      </div>

      <footer className="footer">
        <nav>
          <ul>
            <li><a href="#">Meta</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Locations</a></li>
            <li><a href="#">Instagram Lite</a></li>
            <li><a href="#">Threads</a></li>
            <li><a href="#">Contact Uploading & Non-Users</a></li>
            <li><a href="#">Meta Verified</a></li>
          </ul>
        </nav>
        <div className="footer-bottom">
          <select aria-label="Switch Display Language">
            <option value="en">English</option>
          </select>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}