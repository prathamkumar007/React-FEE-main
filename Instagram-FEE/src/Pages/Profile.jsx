import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';
import ProfilePost from '../components/ProfilePost';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
function Profile(){
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        const token = localStorage.getItem('token');
        
        if (!token || userRole === 'guest') {
            navigate('/login');
        } else {
            setRole(userRole || 'user');
        }
    }, [navigate]);

    if (!role) return null;

    return(
        <div>
            <NavBar role={role} />
            <div className='users-profile'>
                <UserProfile />
                <ProfilePost />
                <Footer />
            </div>
        </div>
    );
}
export default Profile;