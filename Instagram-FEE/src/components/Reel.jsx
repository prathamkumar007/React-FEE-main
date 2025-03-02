import styles from "./Reel.module.css";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";

function Reel() {
  const reels = [
    {
      userDp: "/Images/cr7dp.jpg",
      username: "cristiano",
      like: "4.9M",
      comment: "89.8k",
      video: "/Videos/Video-66.mp4",
    },
    {
      userDp: "/Images/indianct.jpg",
      username: "indiancricketeam",
      like: "5M",
      comment: "36k",
      video: "/Videos/Video-216.mp4",
    },
    {
      userDp: "/Images/anime.jpg",
      username: "_the_animefan",
      like: "100k",
      comment: "278",
      video: "/Videos/Video-99.mp4",
    },
    {
      userDp: "/Images/sekiro.jpg",
      username: "sekiro_editzz",
      like: "50k",
      comment: "649",
      video: "/Videos/Video-169.mp4",
    },
    {
      userDp: "/Images/nature.jpg",
      username: "swiss.beautifuls",
      like: "176k",
      comment: "1,057",
      video: "/Videos/Video-11.mp4",  
    },
  ];

  return (
    <div className={styles["reels-container"]}>
      {reels.map((reel, index) => (
        <div key={index} className={styles["reels_videos"]}>
          <div className={styles.video}>
            <video src={reel.video} autoPlay muted></video>
            <div className={styles.top}>
              <i className="fas fa-camera"></i>
            </div>
            <div className={styles.icons}>
              <div className={styles["like-container"]}>
                <FaRegHeart />
                <small>{reel.like}</small>
              </div>
              <div>
                <FaRegComment />
                <small>{reel.comment}</small>
              </div>
              <PiTelegramLogo />
              <img
                src={reel.userDp}
                alt=""
                width="20px"
                height="20px"
                className={styles["profile-pic"]}
              />
            </div>
            <div className={styles["user_profile"]}>
              <div>
                <img
                  src={reel.userDp}
                  alt=""
                  className={styles["profile-pic"]}
                />
                <h4>{reel.username}</h4>
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
