import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Admin.css'

const Admin = () => {
    const [posts, setPosts] = useState(null)
    const fetch = async() =>{
        let res = await axios.get('http://localhost:3000/posts')
        setPosts(res.data)
    }
    useEffect(() =>{
        fetch()
    }, [posts])
    const deletePost = async (id) =>{
        await axios.delete(`http://localhost:3000/admin/del/${id}`)
        alert('post deleted successfully')
    }
  return (
    <div>
        <h1>Admin</h1>
        <div className="posts">
        {posts?.slice().reverse().map(post => (
            <div className="post admin-post"key={post._id}>
                <h1 >{post.title}</h1>
                <button onClick={()=> deletePost(post._id)}>❌</button>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Admin