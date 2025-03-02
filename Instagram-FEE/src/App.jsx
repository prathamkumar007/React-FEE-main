import NavBar from "./components/NavBar";
import Stories from "./components/Stories";
import Post from "./components/Post";
import Contacts from "./components/Contacts";
import Login from "./components/Login";
import { useState } from "react";

function App() {  
  return (
      <div className="container">
          <NavBar />
          <div className="stories">
            <Stories />
            <Post />
          </div>
            <Contacts />
      </div>
  ) 
}

export default App;
