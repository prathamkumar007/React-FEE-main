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
    const checkAuth = () => {
      // Checks localStorage for saved role
      const storedRole = localStorage.getItem("role");
      // If no role found, defaults to "guest"
      setRole(storedRole || "guest");
    };

    // Only runs check once when component mounts
    if (!hasCheckedToken.current) {
      checkAuth();
      hasCheckedToken.current = true;
    }
  }, [navigate]);

  // Prevents rendering until role is determined
  if (role === null) return null;

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
