import {useState } from 'react';
import styles from './NavBar.module.css';
import {Link, useNavigate} from 'react-router-dom'
function NavBar(){
    const navigate = useNavigate();

    const navLinks = [
        {label : 'Home', to : '/', lightIcon : '/Images/hut.png', darkIcon : '/Images/darkHome.png'},
        {label : 'Search', to : '/search', lightIcon : '/Images/search.png', darkIcon : '/Images/darkSearch.png'},
        {label : 'Explore', to : '/explore', lightIcon : '/Images/compass.png', darkIcon : '/Images/darkExplore.png'},
        {label : 'Reels', to : '/reels', lightIcon : '/Images/reels.png', darkIcon : '/Images/darkReel.png'},
        {label : 'Messages', to : '/messages', lightIcon : '/Images/messenger.png', darkIcon : '/Images/darkMessage.png'},
        {label : 'Notications', to : '/notifications', lightIcon : '/Images/notification.png', darkIcon : '/Images/darkMessage.png'},
        {label : 'Create', to : '/create', lightIcon : '/Images/tab.png', darkIcon : '/Images/darkCreate.png'},
        {label : 'Profile', to : '/profile', lightIcon : '/Images/user.png', darkIcon : ''},
    ]

    const moreLinks = [
        {label : 'Settings', lightIcon : '/Images/settings.png', darkIcon : 'darkSettings.png'},
        {label : 'Your activity', lightIcon : '/Images/activity.png', darkIcon : 'darkActivity.png'},
        {label : 'Saved', lightIcon : '/Images/save-instagram.png', darkIcon : 'dark-save-instagram.png'},
        {label : 'Switch appearance', lightIcon : '/Images/sun.png', darkIcon : 'darkMoon.png'},
        {label : 'Report Problems', lightIcon : '/Images/problem.png', darkIcon : 'darkProblem.png'},
    ]
    const [showMore, setShowMore] = useState(false);
    
    const toggleMoreMenu = () => {
        setShowMore(prevState => !prevState);
    }
    const handleLogin = () =>{
        navigate("/login");
    }

    return(
        <div className={styles.navbar}>
            <div className={styles["nav-logo"]}>
                <h2 className={styles.namelogo}>Instagram</h2>   
                <img src="/Images/instagram.png" alt="" className="light-icon"/>
            </div>
            <div className={styles["nav-topics"]}>
                {navLinks.map((link, index) => (
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

            <div className={`${styles["nav-more"]} ${styles.topics}`} onClick={toggleMoreMenu}>
                <img src="/Images/menu.png" alt="" className="light-icon"/>
                <img src="/Images/darkMenu.png" alt="" className={styles['dark-icon']}/>
                <Link className={styles.links}>More</Link>
            </div>
            
            {showMore && (
                <div className={`${styles["more-settings"]} ${showMore ? styles.show : ''}`}>
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
                    <div className={styles["more-set"]} onClick={handleLogin}>
                        <span className={styles.links}>Log Out</span>
                    </div>
                    <hr />
                </div>
            )}
        </div>
    );
}

export default NavBar;