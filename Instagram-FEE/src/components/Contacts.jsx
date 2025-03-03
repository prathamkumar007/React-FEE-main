import styles from './Contacts.module.css';

function Contacts(){
    let suggestions = [
        {
          username: "_itz_singh_28",
          userPic: "/Images/userDp.jpg",
          follow: "abhinav_jindal",
        },
      ];

    let uName = localStorage.getItem("cUser");  // Now stores email
    return(
        <div className={styles.contacts}>
            <div className={styles.username}>
                <img src="/Images/user.png" alt="" />
                <div className={styles["user-account"]}>
                    <p>{uName}</p>
                    <p className={styles["user-name"]}>{uName}</p>
                </div>
                <a href="#" onClick="toggleLogin()">Switch</a>
                <div className={styles["modal-background"]} id="modalBackground"></div>
                <div className={styles["login-modal"]} id="loginModal">
                    <div className={styles.xIcon}>
                        <i className="fa-solid fa-xmark" onClick="xicon()"></i>
                    </div>
                    <p className={`${styles.namelogo} ${styles["login-insta"]}`}>Instagram</p>
                    <form action=''> 
                        <div className={styles.inputs}>
                            <input type="text" id="username" name="username"
                                placeholder="Phone number, username, or email" className={styles.inpback} />
                            <input type="password" id="password" name="password" placeholder="Password" className={styles.inpback} />
                        </div>
                        <div className={styles.checking}>
                            <input type="checkbox" id="checkbox" />
                            <span>Save login info</span>
                        </div>
                    </form>
                    <div className={styles.logfor}>
                        <button className={styles.loginbutton}>Log in</button>
                        <a href="#" className={styles.forgp}>Forgot password?</a>
                    </div>
                </div>
            </div>
            <div className={styles.suggest}>
                <p className={styles.suggFor}>Suggested for you</p>
                <p className={styles.see}>See All</p>
            </div>
            <div className={styles.suggestions} id="suggest-container">
                {suggestions.map((suggest, index)=>(
                    <div key={index} className={styles["suggestion-1"]}>
                        <img src={suggest.userPic} alt="userpic" />
                        <div>
                            <p className={styles.accounts}>{suggest.username}</p>
                            <p className={`${styles.followed} ${styles.accounts}`}>Followed by {suggest.follow}</p>
                        </div>
                        <div>
                            <a href="#" onClick="Follow(this)">Follow</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.about}>
                <div className={styles["about-topics"]}>
                    <p onClick="footabout()">About</p>
                    <p onClick="foothelp()">Help</p>
                    <p onClick="footpress()">Press</p>
                    <p onClick="footapi()">API</p>
                    <p onClick="footjobs()">Jobs</p>
                    <p onClick="footprivacy()">Privacy</p>
                    <p onClick="footterms()">Terms</p>
                    <p onClick="footlocations()">Locations</p>
                    <p onClick="footlanguage()">Language</p>
                    <p onClick="footmeta()">Meta Verified</p>
                </div>
                <div className={styles.copy}>© 2025 Instagram from Meta</div>
            </div>
        </div>
    );
}
export default Contacts;