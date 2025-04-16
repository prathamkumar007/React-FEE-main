import {useEffect, useRef, useState } from 'react';
import styles from './NavBar.module.css';
import {Link, useNavigate} from 'react-router-dom'

function NavBar({ role = 'guest' }) {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const moreMenuRef = useRef(null);

    const navLinks = [
        {
            label: 'Home',
            to: '/',
            roles: ['guest', 'user', 'admin'],
            lightIcon: '/Images/hut.png',
            darkIcon: '/Images/darkHome.png'
        },
        {
            label: 'Reels',
            to: '/reels',
            roles: ['guest', 'user', 'admin'],
            lightIcon: '/Images/reels.png',
            darkIcon: '/Images/darkReel.png'
        },
        {
            label: 'Search',
            to: '/search',
            roles: ['user', 'admin'],
            lightIcon: '/Images/search.png',
            darkIcon: '/Images/darkSearch.png'
        },
        {
            label: 'Messages',
            to: '/messages',
            roles: ['user', 'admin'],
            lightIcon: '/Images/messenger.png',
            darkIcon: '/Images/darkMessage.png'
        },
        {
            label: 'Create',
            to: '/create',
            roles: ['user', 'admin'],
            lightIcon: '/Images/tab.png',
            darkIcon: '/Images/darkCreate.png'
        },
        {
            label: 'Profile',
            to: '/profile',
            roles: ['user', 'admin'],
            lightIcon: '/Images/user.png',
            darkIcon: ''
        },
        {
            label: 'Admin Dashboard',
            to: '/admin',
            roles: ['admin'],
            lightIcon: '/Images/admin.png',
            darkIcon: '/Images/darkAdmin.png'
        },
        {
            label: 'Settings',
            to: '/settings',
            roles: ['user', 'admin'],
            lightIcon: '/Images/settings.png',
            darkIcon: '/Images/darkSettings.png'
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

    const handleLogout = (e) =>{
        e.stopPropagation();
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("role");
        localStorage.removeItem("cUser");
        navigate("/login");
        setShowMore(false);
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

    return(
        <div className={styles.navbar}>
            <div className={styles["nav-logo"]}>
                <h2 className={styles.namelogo}>Instagram</h2>   
                <img src="/Images/instagram.png" alt="" className="light-icon"/>
            </div>
            <div className={styles["nav-topics"]}>
                {navLinks
                .filter(link => link.roles.includes(role))
                .map((link, index) => (
                    <div key={index} className={`${styles.topics} ${styles[link.label]}`}>
                        <img src= {link.lightIcon} alt= {`${link.label} Light Icon`} className='light-icon' />
                        {link.darkIcon && (
                            <img src= {link.darkIcon} alt= {`${link.label} Dark Icon`} className= {styles['dark-icon']} />
                        )}
                        <Link to={link.to} className= {styles.links}>{link.label}</Link>
                    </div>
                ))}
            </div>

            <div className={`${styles["nav-threads"]} ${styles.topics}`}>
                <img src="/Images/threads.png" alt="" className="light-icon"/>
                <img src="/Images/darkThreads.png" alt="" className={styles['dark-icon']}/>
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
                <img src="/Images/darkMenu.png" alt="" className={styles['dark-icon']}/>
                <Link className={styles.links}>More</Link>
            </div>
            )}
            
            {showMore && (
                <div className={`${styles["more-settings"]} ${showMore ? styles.show : ''}`} onClick = {(e) => e.stopPropagation()}
                ref = {moreMenuRef}>
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
            )}
        </div>
    );
}

export default NavBar;