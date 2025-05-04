import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styles from './Settings.module.css';
import API from '../../utils/api';

function Settings() {
    const [privacy, setPrivacy] = useState('public');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });  // Change message state to object
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        const email = localStorage.getItem('cUser');
        
        if (!userRole || userRole === 'guest') {
            navigate('/login');
            return;
        }

        setRole(userRole);
        
        const fetchUserSettings = async () => {
            try {
                const response = await API.get('/auth/users');
                const userData = response.data.find(user => user.email === email);
                if (userData) {
                    setPrivacy(userData.privacy || 'public');
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        
        fetchUserSettings();
    }, [navigate]);

    const handlePrivacyChange = async (newPrivacy) => {
        try {
            setLoading(true);
            const email = localStorage.getItem('cUser');
            const usersResponse = await API.get('/auth/users');
            const userData = usersResponse.data.find(user => user.email === email);
            
            if (!userData) {
                throw new Error('User not found');
            }

            await API.put(`/auth/settings/${userData._id}`, { 
                privacy: newPrivacy 
            });
            
            setPrivacy(newPrivacy);
            setMessage({ 
                text: `Profile privacy updated to ${newPrivacy}`, 
                type: 'success' 
            });
            localStorage.setItem('privacy', newPrivacy);
            
        } catch (error) {
            setMessage({ 
                text: error.response?.data?.message || 'Failed to update privacy settings',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <NavBar role={role} />
                <div className={styles.settingsContainer}>
                    <h2>Loading settings...</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavBar role={role} />
            <div className={styles.settingsContainer}>
                <h2>Privacy Settings</h2>
                <div className={styles.privacyToggle}>
                    <label>
                        <input
                            type="radio"
                            name="privacy"
                            value="public"
                            checked={privacy === 'public'}
                            onChange={() => handlePrivacyChange('public')}
                        />
                        Public Profile
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="privacy"
                            value="private"
                            checked={privacy === 'private'}
                            onChange={() => handlePrivacyChange('private')}
                        />
                        Private Profile
                    </label>
                </div>
                {message.text && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settings;
