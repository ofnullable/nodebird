import React from 'react';
import { useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = () => {
  const { mainPosts } = useSelector(state => state.post);

  return (
    <div>
      {mainPosts.map(p => (
        <PostCard key={p.createdAt} post={p} />
      ))}
    </div>
  );
};

// component did mount 보다 먼저 실행되는 life cycle
Hashtag.getInitialProps = async context => {
  console.log('hashtag gip');
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.query.tag,
  });
  return { tag: context.query.tag };
};

export default Hashtag;
