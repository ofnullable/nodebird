import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Post = ({ id }) => {
  const { mainPosts } = useSelector(state => state.post);
  return (
    <>
      <Helmet
        title={`${mainPosts[0].User.nickname}님의 게시글`}
        description={mainPosts[0].content}
        meta={[
          { name: `description`, content: mainPosts[0].content },
          {
            property: `og:title`,
            content: `${mainPosts[0].User.nickname}님의 게시글`,
          },
          { property: `og:description`, content: mainPosts[0].content },
          {
            property: `og:image`,
            content: mainPosts[0].Images[0]
              ? `http://localhost:8000/${mainPosts[0].Images[0].src}`
              : null,
          }, // 미리보기 이미지
          { property: `og:url`, content: `http://localhost:3000/post/${id}` }, // 현재 url
        ]}
      />
      <div>{mainPosts[0].content}</div>
      <div>{mainPosts[0].User.nickname}</div>
      {mainPosts[0].Images[0] && (
        <img src={`http://localhost:8000/${mainPosts[0].Images[0].src}`} />
      )}
    </>
  );
};

Post.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    postId: context.query.id,
  });
  return { id: parseInt(context.query.id, 10) };
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Post;
