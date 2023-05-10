import React from 'react';
import './App.css';
import Posts from './Posts/Posts';
import PostSearch from './PostSearch/PostSearch';
export const App = () => {
  return (
    <div>
      <PostSearch/>
      <Posts />
    </div>
  );
};
