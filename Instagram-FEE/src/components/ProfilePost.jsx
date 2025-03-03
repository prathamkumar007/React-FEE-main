import { useEffect, useState } from "react";
import styles from "./ProfilePost.module.css";

function ProfilePost() {
  const [imageUrls, setImageUrls] = useState([]);
  let cUser = localStorage.getItem("cUser");

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const response = await fetch("http://localhost:4000/users");
        const data = await response.json();
        
        const user = data.find((user) => user.email === userEmail);
        if (user && user.myPost && user.myPost.length > 0) {
          fetchPostImages(user.myPost);
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
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.text();
            return data;
          })
        );
        setImageUrls(urls.filter(url => url)); // Filter out any null/undefined values
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
        const userEmail = localStorage.getItem("userEmail");
        const response = await fetch("http://localhost:4000/users");
        const data = await response.json();
        
        const user = data.find((user) => user.email === userEmail);
        if (user && user.myReels && user.myReels.length > 0) {
          fetchReelVideos(user.myReels);
        }
      }
      catch(error){
        console.error("Error fetching user reels:", error);
      }
    }

    async function fetchReelVideos(reelIds) {
      try {
        const urls = await Promise.all(
          reelIds.map(async (id) => {
            const res = await fetch(`http://localhost:4000/reels/${id}`);
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.text();
            return data;
          })
        );
        setVideoUrl(urls.filter(url => url)); // Filter out any null/undefined values
      }
      catch(error) {
        console.error("Error fetching reel videos:", error);
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
