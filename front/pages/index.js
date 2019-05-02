import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
  isLoggedIn: true,
  mainPosts: [{
    User: {
      id: 1,
      nickname: 'joonak',
    },
    content: '첫번째 게시글',
    img: 'http://img.worksout.co.kr/upload/image/editor/20190430/201904301054390291.jpg',
    createdAt: Date.now(),
  }]
};

const Home = () => {
  return (
    <>
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((p, i) => {
        return (
          <PostCard key={`${p.content}`} post={p} />
        );
      })}
    </>
  );
};

export default Home;