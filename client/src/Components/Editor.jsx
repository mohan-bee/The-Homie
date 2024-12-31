import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';
import axios from 'axios';


const Editor = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [coverImage, setCoverImage] = useState('')

    const handleUpload = async () => {
        await axios.post('https://the-homie.onrender.com/admin/new', { title,coverImage, content: value });
        alert('Uploaded successfully');
        setTitle('');
        setValue('');
        setCoverImage('')
    };


    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'], 
            [{ 'align': [] }],
            ['clean'],
        ],
    };

    return (
        <div className="main">
            <div className="title">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Cover Image</label>
                <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
            </div>

            <div className="container-editor">
                <div className="editor">
                    <ReactQuill 
                        value={value} 
                        onChange={setValue} 
                        modules={modules} 
                    />
                </div>

                <div className="preview">
                    <div dangerouslySetInnerHTML={{ __html: value }} />
                </div>
            </div>

            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Editor;
