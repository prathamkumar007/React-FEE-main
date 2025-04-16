import { useState } from 'react';
import '../Static/poststyle.css'

function Post() {
  const [isGuest, setIsguest] = useState(true);
  const [posts, setPosts] = useState([
    {
      username: "indiancricketteam",
      userDp: "/Images/indianct.jpg",
      imageUrl: "/Images/wc24.webp",
      likes: 1,
      comments: "77.5K",
      shares: "4.8M",
      caption: "C.H.A.M.P.I.O.N.S 🏆",
      liked: false,
    },
    {
      username: "cristiano",
      userDp: "/Images/cr7dp.jpg",
      imageUrl: "/Images/cristiano.jpg",
      likes: 20,
      comments: "88.8K",
      shares: "60.8K",
      caption: "😎 🇵🇹",
      liked: false,
    },
    {
      username: "leomessi",
      userDp: "/Images/leodp.jpg",
      imageUrl: "/Images/leomessi.jpg",
      likes: 0,
      comments: "80K",
      shares: "70.8K",
      caption: "Una más… 🏆🏆",
      liked: false,
    },
    {
      username: "virat.kohli",
      userDp: "/Images/viratDp.jpg",
      imageUrl: "/Images/viratkohli.jpg",
      likes: 2,
      comments: "52.5K",
      shares: "30K",
      caption: "Big cat energy 🐈‍⬛​",
      liked: false,
    },
    {
      username: "kendalljenner",
      userDp: "/Images/kendallDp.jpg",
      imageUrl: "/Images/kendall.jpg",
      likes: 100,
      comments: "6,469",
      shares: "20K",
      caption: "9pm sunsets 🐙​",
      liked: false,
    },
  ]);
  const handleLike = (index) => {
    if(isGuest){
      alert("You must log in to like posts.")
    }
    else{
      const newPosts = [...posts];
      if(!newPosts[index].liked) {
        newPosts[index].liked = true;
        newPosts[index].likes += 1;
        setPosts(newPosts);
      }
    }
  }
  return (
    <div className="posts">
      {posts.map((post, index) =>(
        <div key={index} className="post1">
          <div className="name">
            <img
              src={post.userDp}
              alt="userDP"
              className="indiact"
            />
            <span className="username">{post.username}</span>
            <img src="/Images/tick.png" alt="Verified tick" className="tick"/>
          </div>
          <div className="img-container">
            <img
              src={post.imageUrl}
              alt="Post by ${post.username}"
              className="post-image"
            />
          </div>
          <div className="feature light-like-icon">
            <div className="likecommentshare">
              <button className="like" onClick={() => handleLike(index)}
               disabled={post.liked}>
              <i className="far fa-heart"></i>
                <p className="post-likes">{post.likes}</p>
              </button>
              <button className="comment" disabled = {isGuest}>
              <i className="far fa-comment" ></i>
                <p className="post-likes">{post.comments}</p>
              </button>
              <button className="share" disabled = {isGuest}>
              <i className="far fa-paper-plane"></i>
                <p className="post-likes">{post.shares}</p>
              </button>
              <button className="save left" disabled = {isGuest}>
                <i className="far fa-bookmark"></i>
              </button>
            </div>
          </div>
          <div className="feature dark-like-icon">
            <div className="likecommentshare">
              <button className="like" onClick={() => handleLike(index)} disabled={post.liked}>
                <img src="/Images/darkHeart.png" className="dark-img" />
                <p className="post-likes">{post.likes}</p>
              </button>
              <button className="comment">
                <img src="/Images/darkMessage.png" className="dark-img" />
                <p className="post-likes">{post.comments}</p>
              </button>
              <button className="share">
                <img src="/Images/darkShare.png" className="dark-img" />
                <p className="post-likes">{post.shares}</p>
              </button>
              <button className="save left">
                <img src="/Images/darkSave.png" />
              </button>
            </div>
          </div>
          <p className="champions">
            <strong>{post.username}</strong>{post.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
export default Post;