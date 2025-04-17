import { useEffect, useState } from "react";
import styles from "./ProfilePost.module.css";
import API from "../../utils/api";

function ProfilePost() {
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrl, setVideoUrl] = useState([]);
  const [privacy, setPrivacy] = useState('public');
  const [loading, setLoading] = useState(true);

  let cUser = localStorage.getItem("cUser");

  useEffect(() => {
    async function fetchUserPrivacy() {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/auth/me");
        setPrivacy(response.data.privacy || 'public');
        setLoading(false);
        
        // Only fetch posts if profile is public
        if (response.data.privacy !== 'private') {
          fetchUserPosts();
          fetchReels();
        }
      } catch (error) {
        console.error("Error fetching user privacy:", error);
        setLoading(false);
      }
    }

    async function fetchUserPosts() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/auth/users", {
          headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
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
            const res = await fetch(`http://localhost:5000/post/${id}`);
            const data = await res.text();
            return data;
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching post images:", error);
      }
    }

    async function fetchReels() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();

        const user = data.find((user) => user.email == cUser);
        if (user) {
          const reelsIds = user.myReels.flat();
          fetchReelVideos(reelsIds);
        }
      } catch (error) {
        console.error("Error fetching reels:", error);
      }
    }

    async function fetchReelVideos(reelsIds) {
      try {
        const urls = await Promise.all(
          reelsIds.map(async (id) => {
            const res = await fetch(`http://localhost:5000/reels/${id}`);
            const data = await res.text();
            return data;
          })
        );
        setVideoUrl(urls);
      } catch (error) {
        console.error("Error fetching reel videos:", error);
      }
    }

    fetchUserPrivacy();
  }, [cUser]);

  if (loading) return <div>Loading...</div>;

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

      {privacy === 'private' ? (
        <div className={styles["private-profile"]}>
          <div className={styles["lock-icon"]}>
            <i className="fas fa-lock"></i>
          </div>
          <h3>This Account is Private</h3>
          <p>Follow this account to see their photos and videos.</p>
        </div>
      ) : (
        <div className={styles["share-2"]}>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Post ${index}`} />
          ))}
          {videoUrl.map((url, index) => (
            <video key={index} src={url} controls></video>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePost;
