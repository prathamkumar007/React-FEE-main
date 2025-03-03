import styles from "./UserProfile.module.css";

function UserProfile() {
  let cUser = localStorage.getItem("cUser");
  
  return (
    <div className={styles["users-profile-child"]}>
      <div className={styles["profile-pic"]}>
        <img src="/Images/user.png" alt="" />
        <div className={`${styles.part3} ${styles.res}`}>
          <div className={styles.Name}>
            <h3>{cUser}</h3>
          </div>
          <div className={styles["threads-account"]}>
            <button>
              <img src="/Images/threads.png" alt="" className={styles["thread-img"]} />
              _ppratham_kumar
            </button>
          </div>
        </div>
        <div className={styles.new}>
          <a href="#">
            <img src="/Images/add.png" alt="" />
            <p className={styles.new1}>New</p>
          </a>
        </div>
      </div>
      <div className={styles["all-details"]}>
        <div className={styles.part1}>
          <div className={`${styles.username} ${styles["re-username"]}`}>
            <p>{cUser}</p>
          </div>
          <div className={styles.edit}>
            <button className={styles["edit-btn"]}>Edit Profile</button>
          </div>
          <div className={styles.View}>
            <button className={styles["view-btn"]}>View archive</button>
          </div>
          <div>
            <img
              src="/Images/black-settings-button.png"
              alt=""
              className={styles["light-set"]}
              onClick="toggleSettings()"
            />
            <img
              src="/Images/darkSettings.png"
              alt=""
              className={styles["dark-set"]}
              onClick="toggleSettings()"
            />
          </div>
        </div>


        <div className={`${styles.part1} ${styles["res-part1"]}`}>
          <div className={styles.username}>
            <p>{cUser}</p>
            <div>
              <img src="/Images/black-settings-button.png" alt="" />
            </div>
          </div>
          <div className={styles["res-button"]}>
            <div className={styles.edit}>
              <button>Edit Profile</button>
            </div>
            <div className={styles.View}>
              <button>View archive</button>
            </div>
          </div>
        </div>
        <div className={styles.part2}>
          <div className={styles.posts}>
            <p>
              {" "}
              <span>0</span> posts
            </p>
          </div>
          <div className={styles.followers}>
            <p>
              <span>160</span> followers
            </p>
          </div>
          <div className={styles.following}>
            <p>
              <span>227</span> following
            </p>
          </div>
        </div>
        <div className={styles.part3}>
          <div className={styles.Name}>
          </div>
          <div className={styles["threads-account"]}>
            <button className={styles["thread-btn"]}>
              <img
                src="/Images/threads.png"
                alt=""
                className={`${styles["thread-img"]} ${styles["light-set"]}`}
              />
              <img src="/Images/darkThreads.png" alt="" className={styles["dark-set"]} />
              <div className={styles["thread-p"]}>{cUser}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
