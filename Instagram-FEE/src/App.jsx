  import NavBar from "./components/NavBar";
  import Stories from "./components/Stories";
  import Post from "./components/Post";
  import Contacts from "./components/Contacts";
  import { useEffect, useState, useRef } from "react";
  import { useNavigate } from "react-router";

  function App() {  
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const hasCheckedToken = useRef(false);

    useEffect(() => {
      const checkToken = () => {
        const token = localStorage.getItem("token");
        const expiryTime = localStorage.getItem("tokenExpiry");

        if(!token || !expiryTime){
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          setIsAuthenticated(false);
          setTimeout(() => navigate("/login"), 100);
          return;
        }
        const currentTime = Date.now();
        if(currentTime >= expiryTime){
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          setIsAuthenticated(false);
          setTimeout(() => navigate("/login"), 100);
        }
        else{
          setIsAuthenticated(true);
        }
      };
      if(!hasCheckedToken.current){
        checkToken();
        hasCheckedToken.current = true;
      }

      const interval = setInterval(checkToken, 60000);

      return () => clearInterval(interval);
    }, [navigate]);

    if(!isAuthenticated){
      return null;
    }
    return (
        <div className="container">
            <NavBar />
            <div className="stories">
              <Stories />
              <Post />
            </div>
              <Contacts />
        </div>
    ) 
  }

  export default App;
