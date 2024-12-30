import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';
import axios from 'axios';

// Add the modules for the image upload and font selection options
const Editor = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');

    const handleUpload = async () => {
        await axios.post('http://localhost:3000/admin/new', { title, content: value });
        alert('Uploaded successfully');
        setTitle('');
        setValue('');
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
