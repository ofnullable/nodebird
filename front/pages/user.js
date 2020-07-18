import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';

import PostCard from '../components/PostCard';
import { LOAD_USER_REQUEST } from '../store/reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../store/reducers/post';

const User = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  useEffect(() => {}, []);

  return (
    <div>
      {userInfo ? (
        <Card
          style={{ marginBottom: '20px' }}
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts.length}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings.length}
            </div>,
            <div key="followers">
              팔로워
              <br />
              {userInfo.Followers.length}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}
      {mainPosts.map((p) => (
        <PostCard key={p.createdAt} post={p} />
      ))}
    </div>
  );
};

// component did mount 보다 먼저 실행되는 life cycle
// server에서 한번, front에서 한번 실행된다 ( 총 2번 )
// action dispatch를 여기서 하면 페이지 로딩 전 데이터를 받아올 수 있다!
User.getInitialProps = async (context) => {
  const id = parseInt(context.query.id, 10);
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id,
  });
  return { id: parseInt(context.query.id, 10) };
};

export default User;
