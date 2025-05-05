import { useEffect, useState } from "react";
import styles from "./Reel.module.css";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import axios from 'axios';

function Reel() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/reels")
    .then(res => setReels(res.data))
    .catch(err => console.error("Error fetching reels: ", err));
  }, [])

  return (
    <div className={styles["reels-container"]}>
      {reels.map((reel, index) => (
        <div key={index} className={styles["reels_videos"]}>
          <div className={styles.video}>
            <video src={reel.videoUrl} autoPlay muted></video>
            <div className={styles.top}>
              <i className="fas fa-camera"></i>
            </div>
            <div className={styles.icons}>
              <div className={styles["like-container"]}>
                <FaRegHeart />
                <small>{reel.likes}</small>
              </div>
              <div>
                <FaRegComment />
                <small>{reel.comment.length}</small>
              </div>
              <PiTelegramLogo />
              <img
                src={reel.profileImage}
                alt=""
                width="20px"
                height="20px"
                className={styles["profile-pic"]}
              />
            </div>
            <div className={styles["user_profile"]}>
              <div>
                <img
                  src={reel.profileImage}
                  alt=""
                  className={styles["profile-pic"]}
                />
                <h4>{reel.accountName}</h4>
                <button>Follow</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Reel;
