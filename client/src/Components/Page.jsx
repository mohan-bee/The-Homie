import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import './Page.css';

const Page = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`https://the-homie.onrender.com/post/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <div>
      {post ? (
        <div className='container'>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
