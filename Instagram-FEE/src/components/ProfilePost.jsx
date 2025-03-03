import { useEffect, useState } from "react";
import styles from "./ProfilePost.module.css";

function ProfilePost() {
  const [imageUrls, setImageUrls] = useState([]);
  let cUser = localStorage.getItem("cUser");  // Now stores email

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const userEmail = localStorage.getItem("cUser"); // Use cUser since it now stores email
        const response = await fetch("http://localhost:4000/users");
        const data = await response.json();
        
        const user = data.find((user) => user.email === userEmail);
        console.log("Found user:", user); // Debug log
        
        if (user && Array.isArray(user.myPost) && user.myPost.length > 0) {
          console.log("User posts:", user.myPost); // Debug log
          fetchPostImages(user.myPost);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    async function fetchPostImages(postIds) {
      try {
        console.log("Fetching posts for IDs:", postIds); // Debug log
        const urls = await Promise.all(
          postIds.map(async (id) => {
            try {
              const res = await fetch(`http://localhost:4000/post/${id}`);
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              const data = await res.text();
              console.log(`Post ${id} data:`, data); // Debug log
              return data;
            } catch (err) {
              console.error(`Error fetching post ${id}:`, err);
              return null;
            }
          })
        );
        setImageUrls(urls.filter(url => url !== null));
      } catch (error) {
        console.error("Error fetching post images:", error);
      }
    }

    fetchUserPosts();
  }, []);

  const [videoUrl, setVideoUrl] = useState([]);  // Initialize as array instead of string

  useEffect(() => {
    async function fetchReels(){
      try{
        const response = await fetch("http://localhost:4000/reels");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
