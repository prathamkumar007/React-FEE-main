import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import API from '../../utils/api';
import styles from './UserDiscovery.module.css';

function UserDiscovery() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('cUser');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await API.get('/auth/users');
                const filteredUsers = response.data.filter(user => 
                    user.email !== currentUser && user.role !== 'admin'
                );
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentUser]);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserClick = (email) => {
        navigate(`/profile/${email}`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <NavBar role="user" />
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.userGrid}>
                    {filteredUsers.map(user => (
                        <div 
                            key={user._id} 
                            className={styles.userCard}
                            onClick={() => handleUserClick(user.email)}
                        >
                            <img src="/Images/user.png" alt="Profile" />
                            <div className={styles.userInfo}>
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserDiscovery;
