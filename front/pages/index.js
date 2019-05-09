import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../reducers/user';
import { addDummy } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(loginAction);
    dispatch(addDummy);
  }, []);
  return (
    <>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((p) => {
        return (
          <PostCard key={`${p.content}`} post={p} />
        );
      })}
    </>
  );
};

export default Home;