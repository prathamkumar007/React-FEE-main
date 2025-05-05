import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';
import ProfilePost from '../components/ProfilePost';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
 
function Profile(){
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const { email } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        
        if (!userRole || (userRole === 'guest' && !token)) {
            navigate('/login');
            return;
        }
        
        setRole(userRole || 'user');
    }, [navigate]);

    if (!role) return null;

    return(
        <div>
            <NavBar role={role} />
            <div className='users-profile'>
                <UserProfile profileEmail={email} />
                <ProfilePost profileEmail={email} />
                <Footer />
            </div>
        </div>
    );
}
export default Profile;