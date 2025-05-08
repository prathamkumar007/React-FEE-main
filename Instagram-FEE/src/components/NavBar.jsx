import {useEffect, useRef, useState } from 'react';
import styles from './NavBar.module.css';
import {Link, useNavigate} from 'react-router-dom'

function NavBar({ role = 'guest' }) {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const currentUser = localStorage.getItem('cUser');
    const moreMenuRef = useRef(null);

    const handleNavigation = (path, label) => {
        if (label === 'Profile' && currentUser) {
            navigate(`/profile/${currentUser}`);
        } else if (label === 'Settings') {
            navigate('/settings');
            setShowMore(false);
        } else {
            navigate(path);
        }
    };

    const navLinks = [
        {
            label: 'Home',
            path: '/home',
            roles: ['guest', 'user', 'admin'],
            icon: '/Images/hut.png'
        },
        {
            label: 'Reels',
            path: '/reels',
            roles: ['guest', 'user', 'admin'],
            icon: '/Images/reels.png'
        },
        {
            label: 'Search',
            path: '/discover',
            roles: ['user', 'admin'],
            icon: '/Images/search.png'
        },
        {
            label: 'Messages',
            to: '/messages',
            roles: ['user', 'admin'],
            icon: '/Images/messenger.png'
        },
        {
            label: 'Create',
            to: '/create',
            roles: ['user', 'admin'],
            icon: '/Images/tab.png'
        },
        {
            label: 'Profile',
            path: '/profile',
            roles: ['user', 'admin'],
            icon: '/Images/user.png'
        },
        {
            label: 'Admin Dashboard',
            to: '/admin',
            roles: ['admin'],
            icon: '/Images/admin.png'
        },
        {
            label: 'Settings',
            path: '/settings',
            roles: ['user', 'admin'],
            icon: '/Images/settings.png'
        }
    ];

    const moreLinks = [
        {label : 'Settings', lightIcon : '/Images/settings.png', darkIcon : 'darkSettings.png'},
        {label : 'Your activity', lightIcon : '/Images/activity.png', darkIcon : 'darkActivity.png'},
        {label : 'Saved', lightIcon : '/Images/save-instagram.png', darkIcon : 'dark-save-instagram.png'},
        {label : 'Switch appearance', lightIcon : '/Images/sun.png', darkIcon : 'darkMoon.png'},
        {label : 'Report Problems', lightIcon : '/Images/problem.png', darkIcon : 'darkProblem.png'},
    ];

    const toggleMoreMenu = () => {
        setShowMore(prevState => !prevState);
    };

    const handleLogout = (e) => {
        e.stopPropagation();
        // Clear all auth data
        localStorage.removeItem("role");
        localStorage.removeItem("cUser");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        
        // Force reload to update all components
        window.location.href = '/login';
    };

    useEffect(() => {
        const handleClickOutside = (event) =>{
            if(moreMenuRef.current && !moreMenuRef.current.contains(event.target)){
                setShowMore(false);
            }
        };
        if(showMore){
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showMore]);

    // Add scroll lock when dropdown is open
    useEffect(() => {
        if (showMore) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMore]);

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles["nav-logo"]}>
                    <h2 className={styles.namelogo}>Instagram</h2>   
                    <img src="/Images/instagram.png" alt="" className="light-icon"/>
                </div>
                <div className={styles["nav-topics"]}>
                    {navLinks
                    .filter(link => link.roles.includes(role))
                    .map((link, index) => (
                        <div 
                            key={index} 
                            className={`${styles.topics} ${styles[link.label]}`}
                            onClick={() => handleNavigation(link.path, link.label)}
                        >
                            <img src={link.icon} alt={link.label} className='light-icon' />
                            <span className={styles.links}>{link.label}</span>
                        </div>
                    ))}
                </div>

                <div className={`${styles["nav-threads"]} ${styles.topics}`}>
                    <img src="/Images/threads.png" alt="" className="light-icon"/>
                    <Link className={styles.links}>Threads</Link>
                </div>
                {role === "guest" && (
                <div className={`${styles["nav-login"]} ${styles.topics}`} onClick={() => navigate('/login')}>
                    
                    <span className={styles.links}>Log In</span>
                </div>
                )}
                {role !== "guest" && (
                <div className={`${styles["nav-more"]} ${styles.topics}`} onClick={toggleMoreMenu}>
                    <img src="/Images/menu.png" alt="" className="light-icon"/>
                    <Link className={styles.links}>More</Link>
                </div>
                )}
                
            </div>
            {showMore && (
                <>
                    <div className={styles.overlay} onClick={() => setShowMore(false)}></div>
                    <div className={`${styles["more-settings"]} ${styles.show}`} ref={moreMenuRef}>
                        {moreLinks.map((link, index) => (
                            <div key={index} className={styles["more-set"]}>
                                <img src={link.lightIcon} alt={`${link.label} Icon`} className="light-set" />
                                <span className={styles.links}>{link.label}</span>
                            </div>
                        ))}
                        <div className={styles["more-set"]}>
                            <span className={styles.links}>Switch Accounts</span>
                        </div>
                        <hr />
                        <div className={styles["more-set"]} onClick={handleLogout}>
                            <span className={styles.links}>Log Out</span>
                        </div>
                        <hr />
                    </div>
                </>
            )}
        </>
    );
}

export default NavBar;