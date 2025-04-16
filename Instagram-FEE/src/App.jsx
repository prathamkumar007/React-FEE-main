import NavBar from "./components/NavBar";
import Stories from "./components/Stories";
import Post from "./components/Post";
import Contacts from "./components/Contacts";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const hasCheckedToken = useRef(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const expiryTime = localStorage.getItem("tokenExpiry");
      const storedRole = localStorage.getItem("role");

      if (!token || !expiryTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("role");
        setRole("guest");
        return;
      }

      const currentTime = Date.now();
      if (currentTime >= expiryTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("role");
        setRole("guest");
      } else {
        setRole(storedRole || "user");
      }
    };

    if (!hasCheckedToken.current) {
      checkToken();
      hasCheckedToken.current = true;
    }

    const interval = setInterval(checkToken, 60000);
    return () => clearInterval(interval);
  }, [navigate]);

  if (role === null) return null; // Wait until token check completes

  return (
    <div className="container">
      <NavBar role={role} />
      <div className="stories">
        <Stories role={role} />
        <Post role={role} />
      </div>
      <Contacts role={role} />
    </div>
  );
}

export default App;
