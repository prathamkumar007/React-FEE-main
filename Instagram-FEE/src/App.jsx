import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Stories from "./components/Stories";
import Post from "./components/Post";
import Contacts from "./components/Contacts";

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userRole = localStorage.getItem('role');
  
      if (userRole === 'guest') {
        setRole('guest');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      const cUser = localStorage.getItem('cUser');

      if (!token || !cUser || !userRole) {
        navigate('/login');
        return;
      }

      setRole(userRole);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

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
