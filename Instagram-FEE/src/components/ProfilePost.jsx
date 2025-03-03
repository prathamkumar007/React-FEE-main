import { useEffect, useState } from "react";
import styles from "./ProfilePost.module.css";

function ProfilePost() {
  const [imageUrls, setImageUrls] = useState([]);
  let cUser = localStorage.getItem("cUser");

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await fetch("http://localhost:4000/users");
        const data = await response.json();
        
        const user = data.find((user) => user.email === cUser);
        if (user) {
          const postIds = user.myPost.flat();
          fetchPostImages(postIds);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    async function fetchPostImages(postIds) {
      try {
        const urls = await Promise.all(
          postIds.map(async (id) => {
            const res = await fetch(`http://localhost:4000/post/${id}`);
            const data = await res.text();
            return data;
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching post images:", error);
      }
    }

    fetchUserPosts();
  }, [cUser]);

  const [videoUrl, setVideoUrl] = useState([]);  // Initialize as array instead of string

  useEffect(() => {
    async function fetchReels(){
      try{
        const response = await fetch("http://localhost:4000/reels");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Since reels are stored as an object, we get the values
        const reelUrls = Object.values(data);
        setVideoUrl(reelUrls);
      }
      catch(error){
        console.error("Error fetching reels:", error);
      }
    }

    fetchReels();
  }, [cUser]);

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

      {/* Render dynamic images */}
      <div className={styles["share-2"]}>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Post ${index}`} />
        ))}
        {videoUrl.map((url, index) => (
          <video key={index} src={url} controls></video>
        ))}
      </div>
    </div>
  );
}

export default ProfilePost;
