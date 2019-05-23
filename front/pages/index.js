import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux'; // redux-hook
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MAIN_POSTS_REQUEST,
  //   });
  // }, []);

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
