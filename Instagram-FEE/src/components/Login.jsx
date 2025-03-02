import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import axios from 'axios';

function Login() {
  const [phoneImages, setPhoneImages] = useState({
    back: "",
    front: "",
  });
  const [email,setemail]=useState("");
  const [password,setpassword] = useState("");
  const [error, setError] = useState(null);
  const UNSPLASH_API_KEY = "E0ALOBG92sDBhOmSqp6n0SO4W35_vheYws0pOPB-Peg";
  const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&count=2`;

  const fetchRandomImages = async () => {
    try {
      const response = await fetch(UNSPLASH_URL);
      const data = await response.json();
      setPhoneImages({
        back: data[0].urls.regular,
        front: data[1].urls.regular,
      });
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  useEffect(() => {
    fetchRandomImages();
    const interval = setInterval(() => {
      fetchRandomImages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

const loginUser = async (email, password) => {
  try {
    console.log(email,password);
    const response = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
    });
    console.log(response.data);
    navigate("/");
  } catch (error) {
    alert(error.response.data.message);
  }
};
const handleSubmit = (e) => {
  e.preventDefault();
  setError(null);
  loginUser(email,password);
};
  return (
    <div className="container">
      <main className="main">
        <div className="login-section">
          <div className="phones-container">
            <div className="phones">
              <div className="phone phone-back">
                <img
                  src={phoneImages.back || "placeholder.jpg"}
                  alt="Random back phone screen"
                  className="phone-screen"
                />
              </div>
              <div className="phone phone-front">
                <img
                  src={phoneImages.front || "placeholder.jpg"}
                  alt="Random front phone screen"
                  className="phone-screen"
                />
              </div>
            </div>
          </div>

          <div className="login-content">
            <div className="login-container">
              <p className="instagram-logo">Instagram</p>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Phone number, username, or email"
                    aria-label="Phone number, username, or email"
                    onChange={(e)=>setemail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <input
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    onChange={(e)=>setpassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="login-button">
                  Log in
                </button>
              </form>
              <div className="divider">
                <span>OR</span>
              </div>
              <button className="facebook-login">
                <svg
                  className="facebook-icon"
                  height="16"
                  width="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"
                  />
                </svg>
                Log in with Facebook
              </button>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <div className="signupContainer">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={handleSignUp}>
                  Sign up
                </a>
              </p>
            </div>
            <div className="get-app">
              <p>Get the app.</p>
              <div className="app-links">
                <a
                  href="https://apps.apple.com/us/app/instagram/id389801252"
                  target="_blank"
                  className="app-store-link"
                  rel="noreferrer"
                >
                  <img
                    alt="Download on the App Store"
                    className="store-badge"
                    src="https://static.cdninstagram.com/rsrc.php/v4/yt/r/Yfc020c87j0.png"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.instagram.android"
                  target="_blank"
                  className="play-store-link"
                  rel="noreferrer"
                >
                  <img
                    alt="Get it on Google Play"
                    className="store-badge"
                    src="https://static.cdninstagram.com/rsrc.php/v4/yz/r/c5Rp7Ym-Klz.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <nav>
          <ul>
            <li>
              <a href="#">Meta</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">API</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Locations</a>
            </li>
            <li>
              <a href="#">Instagram Lite</a>
            </li>
            <li>
              <a href="#">Threads</a>
            </li>
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
export default Login;