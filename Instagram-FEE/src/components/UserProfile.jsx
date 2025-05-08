import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";
import API from "../../utils/api";

function UserProfile({ profileEmail }) {
  const [userPrivacy, setUserPrivacy] = useState('public');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const navigate = useNavigate();
  
  // Get current user from localStorage
  const currentUser = localStorage.getItem("cUser");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // If no profileEmail provided and no currentUser, redirect to login
        if (!profileEmail && !currentUser) {
          navigate('/login');
          return;
        }

        const targetEmail = profileEmail || currentUser;
        const response = await API.get('/auth/users');
        const userData = response.data.find(user => user.email === targetEmail);
        
        if (userData) {
          setUserData(userData);
          setUserPrivacy(userData.privacy || 'public');
          setFollowerCount(userData.followers?.length || 0);
          setFollowingCount(userData.following?.length || 0);
          
          // Check if current user is following this profile
          const currentUserData = response.data.find(u => u.email === currentUser);
          if (currentUserData) {
            setIsFollowing(currentUserData.following.includes(userData._id));
          }
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [profileEmail, currentUser, navigate]);

  const handleFollowToggle = async () => {
    if (!userData) return;
    
    try {
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      const response = await API.post(`/auth/${endpoint}/${userData._id}`, {
        followerEmail: currentUser
      });
      
      setIsFollowing(!isFollowing);
      setFollowerCount(response.data.followerCount);
      
    } catch (error) {
      console.error('Error toggling follow:', error);
      alert(error.response?.data?.message || 'Error updating follow status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div className={styles["users-profile-child"]}>
      <div className={styles["profile-pic"]}>
        <img src="/Images/user.png" alt="" />
        <div className={`${styles.part3} ${styles.res}`}>
          <div className={styles.Name}>
            <h3>{userData.email}</h3>
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
          <div className={styles.username}>
            <p>{userData?.username || profileEmail}</p>
          </div>
          
          {profileEmail !== currentUser && (
            <button 
              className={`${styles["follow-btn"]} ${isFollowing ? styles.following : ''}`}
              onClick={handleFollowToggle}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>

        <div className={styles.part2}>
          <div className={styles.posts}>
            <p>
              <span>{Array.isArray(userData?.myPost) ? userData.myPost.length : 0}</span> posts
            </p>
          </div>
          <div className={styles.followers}>
            <p><span>{followerCount}</span> followers</p>
          </div>
          <div className={styles.following}>
            <p><span>{followingCount}</span> following</p>
          </div>
        </div>
        <div className={styles.part3}>
          <div className={styles.Name}>
          </div>
          {userPrivacy === 'private' ? (
            <div className={styles["privacy-message"]}>
              <p>This profile is private</p>
              <p className={styles["privacy-info"]}>Only approved followers can see posts and activity</p>
            </div>
          ) : null}
          <div className={styles["threads-account"]}>
            <button className={styles["thread-btn"]}>
              <img
                src="/Images/threads.png"
                alt=""
                className={`${styles["thread-img"]} ${styles["light-set"]}`}
              />
              <img src="/Images/darkThreads.png" alt="" className={styles["dark-set"]} />
              <div className={styles["thread-p"]}>{currentUser}</div>
            </button>
          </div>
          {userPrivacy === 'private' && (
            <div className={styles["privacy-badge"]}>
              <i className="fas fa-lock"></i>
              <span>Private Account</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
