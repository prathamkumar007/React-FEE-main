import styles from './ProfilePost.module.css'

function ProfilePost() {
  return (
      <div className={styles.share}>
        <hr />
        <div className={styles["share-1"]}>
          <div className={styles.Posts}>
            <img src="/Images/profile.png" alt="" className={styles["light-set"]} />
            <img src="/Images/darkProfile.png" alt="" className={styles["dark-set"]} />
            <p className={styles["share-p"]}>POSTS</p>
          </div>

          <div className={styles.Posts}>
            <img src="/Images/save-instagram.png" alt="" className={styles["light-set"]} />
            <img src="/Images/darkSave.png" alt="" className={styles["dark-set"]} />
            <p className={styles["share-p"]}>SAVED</p>
          </div>

          <div className={styles.Posts}>
            <img src="/Images/comment.png" alt="" className={styles["light-set"]} />
            <img src="/Images/darkTag.png" alt="" className={styles["dark-set"]} />
            <p className={styles["share-p"]}>TAGGED</p>
          </div>
        </div>
        <div className={styles["share-2"]}>
          <img src="/Images/post1.jpg" alt="" />
          <img src="/Images/post2.jpg" alt="" />
        </div>
      </div>
  );
}
export default ProfilePost;