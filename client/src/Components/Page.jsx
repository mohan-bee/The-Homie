import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import './Page.css';
import Navbar from './Navbar';
import Loader from './Loader';

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
      <Navbar />
      {post ? (
        <div className='container'>
          <div className="coverImage">
          <img src={post.coverImage}/>
          </div>
          <h1>{post.title}</h1>
          <p className="timestamp">
                {new Date(post.createdAt).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Page;
