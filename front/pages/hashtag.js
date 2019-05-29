import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts } = useSelector(state => state.post);

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
      {mainPosts.map(p => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
};

// component did mount 보다 먼저 실행되는 life cycle
Hashtag.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.query.tag,
  });
  return { tag: context.query.tag };
};

export default Hashtag;
