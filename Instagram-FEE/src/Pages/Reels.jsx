import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar";
import Reel from "../components/Reel";

function Reels() {
  const [role, setRole] = useState('guest');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  return (
    <div>
      <NavBar role={role} />
      <Reel />
    </div>
  );
}

export default Reels;
