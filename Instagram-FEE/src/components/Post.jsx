import { useState, useEffect } from 'react';
import '../Static/poststyle.css'
import axios from 'axios';

function Post({ role }) {
  const [isGuest, setIsguest] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/post")
    .then(res => setPosts(res.data))
    .catch(err => console.error("Error fetching posts: ", err));
  }, [])

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole && userRole !== 'guest') {
      setIsguest(false);
    } else {
      setIsguest(true);
    }
  }, []);
  
  const handleLike = (index) => {
    if (isGuest) {
      alert("You must log in to like posts.");
      return;
    }
    const updatedPosts = [...posts];
    if (!updatedPosts[index].liked) {
      updatedPosts[index].liked = true;
      updatedPosts[index].likes += 1;
      setPosts(updatedPosts);
    }
  }

  return (
    <div className="posts">
      {posts.map((post, index) =>(
        <div key={index} className="post1">
          <div className="name">
            <img
              src={post.profileImage}
              alt="userDP"
              className="indiact"
            />
            <span className="username">{post.accountName}</span>
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
                <p className="post-likes">{post.comment.length}</p>
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
                <p className="post-likes">{post.comment.length  }</p>
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
            <strong>{post.accountName}</strong>{post.content}
          </p>
        </div>
      ))}
    </div>
  );
}
export default Post;