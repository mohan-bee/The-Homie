import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetch = async () => {
    try {
      let res = await axios.get('https://the-homie.onrender.com/posts');
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
      <Navbar />
      <div className="posts">
  {posts?.slice().reverse().map((post) => (
    <Link to={`/post/${post._id}`} className="post" key={post._id}>
      <img src={post.coverImage || 'default-image.jpg'} alt={post.title || 'Post Cover'} />
      <div className="content">
        <h3>{post.title}</h3>
        <p className="timestamp">
                {new Date(post.createdAt).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </p>
        <div dangerouslySetInnerHTML={{ __html: processContent(post.content) }} />
      </div>
    </Link>
  ))}
</div>

    </div>
  );
};

export default Home;
