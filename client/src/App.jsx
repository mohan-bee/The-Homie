import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Editor from './Components/Editor';
import './App.css';
import Page from './Components/Page';
import AdminPage from './Components/AdminPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="post/:id" element={<Page />} />
        <Route path="admin/new" element={<Editor />} />
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
