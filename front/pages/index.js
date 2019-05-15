import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux'; // redux-hook

const Home = () => {
  const { isSignIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(signinAction);
  }, []);

  return (
    <>
      {isSignIn && <PostForm />}
      {mainPosts.map((p) => {
        return (
          <PostCard key={`${p.content}`} post={p} />
        );
      })}
    </>
  );
};

export default Home;