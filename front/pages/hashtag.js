import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../store/reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts } = useSelector((state) => state.post);

  const onScroll = useCallback(() => {
    if (
      hasMorePosts &&
      window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
    ) {
      dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        lastId: mainPosts[mainPosts.length - 1].id,
        data: tag,
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
      {mainPosts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

// component did mount 보다 먼저 실행되는 life cycle
Hashtag.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.query.tag,
  });
  return { tag: context.query.tag };
};

export default Hashtag;
