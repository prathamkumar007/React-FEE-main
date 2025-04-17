import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styles from './Settings.module.css';
import API from '../../utils/api';

function Settings() {
    const [privacy, setPrivacy] = useState('public');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('user'); // Add role state
    const navigate = useNavigate();

    useEffect(() => {
        // First check if user is logged in and get role
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        
        if (!token || userRole === 'guest') {
            navigate('/login');
            return;
        } else {
            setRole(userRole || 'user');
        }
        
        // Then fetch user settings
        const fetchUserSettings = async () => {
            try {
                const response = await API.get('/auth/me');
                setPrivacy(response.data.privacy || 'public');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching settings:', error);
                navigate('/login');
            }
        };
        
        fetchUserSettings();
    }, [navigate]);

    const handlePrivacyChange = async (newPrivacy) => {
        try {
            setLoading(true);
            const response = await API.put('/auth/settings', { privacy: newPrivacy });
            if (response.data.privacy) {
                setPrivacy(response.data.privacy);
                setMessage('Privacy settings updated successfully');
            }
        } catch (error) {
            console.error('Privacy update error:', error);
            setMessage(error.response?.data?.message || 'Failed to update privacy settings');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

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
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
}

export default Settings;
