import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetch = async () => {
    try {
      let res = await axios.get('http://localhost:3000/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);


  const processContent = (content) => {

    const contentWithoutImages = content.replace(/<img[^>]*>/g, '');
    const limitedText = contentWithoutImages.length > 100 ? contentWithoutImages.slice(0, 100) + '...' : contentWithoutImages;

    return limitedText;
  };

  return (
    <div>
      <h1>The Homie Life</h1>
      <div className="posts">
        {posts?.slice().reverse().map(post => (
          <Link to={`/post/${post._id}`} className="post" key={post._id}>
            <h3>{post.title}</h3>
            <div dangerouslySetInnerHTML={{__html:processContent(post.content) }} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
