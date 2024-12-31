const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./modals/Post');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT 
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables");
    process.exit(1); 
}


// const corsOptions = {
//     origin: 'https://the-homie.vercel.app',
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type, Authorization',
// };

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());

const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ url: `http://localhost:3000/uploads/${req.file.filename}` });
});


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected Successfully!');
    })
    .catch(err => {
        console.error('Database Connection Failed:', err.message);
        process.exit(1); 
    });


app.get('/posts', async (req, res) =>{
    try{
        const posts = await Post.find()
        res.status(201).json(posts)
    }
    catch(err){
        console.error('Error creating post:', err.message);
        res.status(500).json({ error: 'Failed to Fetch post' });
    }
})

app.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post); 
    } catch (err) {
        console.error('Error opening post:', err.message);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});


app.post('/admin/new', async (req, res) => {
    const { title,coverImage, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and Content are required' });
    }

    try {
        const newPost = new Post({ title,coverImage,content });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        console.error('Error creating post:', err.message);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.delete('/admin/del/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully', post });
    } catch (err) {
        console.error('Error deleting post:', err.message);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});
