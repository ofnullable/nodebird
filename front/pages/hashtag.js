import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
    });
  }, []);

  return (
    <div>
      {mainPosts.map(p => (
        <PostCard key={p.createdAt} post={p} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: propTypes.string.isRequired,
};

// component did mount 보다 먼저 실행되는 life cycle
Hashtag.getInitialProps = async context => {
  return { tag: context.query.tag };
};

export default Hashtag;
