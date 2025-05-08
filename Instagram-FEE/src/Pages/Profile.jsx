import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';
import ProfilePost from '../components/ProfilePost';
import Footer from '../components/Footer';
 
function Profile() {
    const [role, setRole] = useState('guest');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { email } = useParams();

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        const currentUser = localStorage.getItem('cUser');
        
        if (!userRole || userRole === 'guest') {
            navigate('/');
            return;
        }
        
        setRole(userRole);
        setLoading(false);
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <NavBar role={role} key="navbar" /> {/* Add key prop to force re-render */}
            <div className='users-profile'>
                <UserProfile profileEmail={email} />
                <ProfilePost profileEmail={email} />
                <Footer />
            </div>
        </div>
    );
}

export default Profile;