import { useEffect, useState } from "react";
import styles from "./ProfilePost.module.css";
import axios from 'axios';
import PostUpload from "./PostUpload";
import { FaLock } from 'react-icons/fa';

function ProfilePost({ profileEmail }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [userPrivacy, setUserPrivacy] = useState('public');

  const currentUserEmail = localStorage.getItem("cUser");

  const targetUserEmail = profileEmail || currentUserEmail;

  const isOwnProfile = targetUserEmail === currentUserEmail;

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("http://localhost:5000/auth/users");
        const currentUser = response.data.find(
          (user) => user.email === currentUserEmail
        );

        if (currentUser) {
          setUserPrivacy(currentUser.privacy || 'public');
          if (currentUser.privacy === 'public') {
            const uniquePostIds = [...new Set(currentUser.myPost)].filter(Boolean);
            await fetchUserPosts(uniquePostIds);
          } else {
            setPosts([]);
            
            return (
              <div className={styles["private-profile"]}>
                <FaLock className={styles["lock-icon"]} />
                <h3>This Account is Private</h3>
                <p>Only you can see your posts when your account is private.</p>
              </div>
            );
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchUserPosts(postIds = []) {
      try {
        const fetchedPosts = [];
        
        if (postIds.length === 0) {
          setPosts([]);
          return;
        }
        
        for (const id of postIds) {
          if (!id) continue;
          
          try {
            const res = await axios.get(`http://localhost:5000/post/${id}`);
            if (res.data && res.data.imageUrl) {
              fetchedPosts.push(res.data);
            }
          } catch (err) {
            console.error(`Error fetching post ${id}:`, err);
          }
        }
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching post images:", error);
        setPosts([]); 
      }
    }

    fetchUserData();
  }, [currentUserEmail, refresh]);

  const handlePostUploaded = () => {
    setRefresh((prev) => !prev);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/post/${postId}`, {
          params: { email: currentUserEmail }
        });
        
        alert("Post deleted successfully");
        setRefresh((prev) => !prev);
      } catch (err) {
        console.error("Error deleting post:", err);
        
        if (err.response) {
          console.error("Response status:", err.response.status);
          console.error("Response data:", err.response.data);
        }
        
        alert("Failed to delete post. Please check the console for details.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  if (userPrivacy === 'private' && !isOwnProfile) {
    return (
      <div className={styles["private-profile"]}>
        <FaLock className={styles["lock-icon"]} />
        <h3>This Account is Private</h3>
        <p>Only you can see your posts when your account is private.</p>
      </div>
    );
  }

  return (
    <div className={styles.share}>
      {isOwnProfile && (
        <div style={{ margin: "20px 0" }}>
          <PostUpload email={currentUserEmail} onPostUploaded={handlePostUploaded} />
        </div>
      )}

      <div className={styles["share-2"]}>
        {posts.length === 0 ? (
          <p className={styles["no-posts"]}>No posts to show</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className={styles["post-container"]}>
              <img src={post.imageUrl} alt={`Post ${index}`} />
              {isOwnProfile && (
                <button 
                  onClick={() => handleDeletePost(post._id)} 
                  className={styles["delete-btn"]}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfilePost;
