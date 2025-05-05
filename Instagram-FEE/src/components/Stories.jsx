import { useEffect, useState } from 'react';
import '../Static/story.css';
import axios from 'axios';
 
function Stories() {
  const [stories, setStories] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/story')
    .then(res => setStories(res.data))
    .catch(err => console.error('Error fetching Stories: ', err));
  })
  return (
      <div className="insta-story">
        {stories.map((story, index) => (
          <div key={index} className="all-story">
            <div className="back">
              <div className="story1">
                <img src={story.profileImage} alt="" className="story1" />
              </div>
            </div>
            <div className="user-story">
              <p>{story.accountName}</p>
            </div>
          </div>
        ))}
      </div>
  );
}
export default Stories;
