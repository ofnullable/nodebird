import React, { useEffect, useCallback } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux'; // redux-hook
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts } = useSelector(state => state.post);

  const onScroll = useCallback(() => {
    if (
      hasMorePosts &&
      window.scrollY + document.documentElement.clientHeight ===
      document.documentElement.scrollHeight
    ) {
      dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
        lastId: mainPosts[mainPosts.length - 1].id,
      });
    }
  }, [mainPosts.length, hasMorePosts]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts]);

  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map(p => {
        return <PostCard key={p.id} post={p} />;
      })}
    </div>
  );
};

Home.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
