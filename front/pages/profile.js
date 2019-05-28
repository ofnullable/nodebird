import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, List, Card, Icon } from 'antd';
import Router from 'next/router';

import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UNFOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
} from '../reducers/user';
import PostCard from '../containers/PostCard';
import NicknameEditForm from '../containers/NicknameEditForm';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const Profile = () => {
  const {
    followerList,
    followingList,
    hasMoreFollowers,
    hasMoreFollowings,
  } = useSelector(state => state.user);
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) {
      alert('Sign in first!');
      Router.push('/');
    }
  }, []);

  const unfollowUser = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const removeFollower = useCallback(
    userId => () => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length,
    });
  }, [followingList.length]);

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    });
  }, [followerList.length]);

  if (!me) {
    return null;
  }

  return (
    <div>
      <NicknameEditForm />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size='small'
        header={<div>팔로잉</div>}
        loadMore={
          hasMoreFollowings && (
            <Button style={{ width: '100%' }} onClick={loadMoreFollowings}>
              더보기
            </Button>
          )
        }
        bordered
        dataSource={followingList}
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card
              actions={[
                <Icon key='stop' type='stop' onClick={unfollowUser(item.id)} />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size='small'
        header={<div>팔로워</div>}
        loadMore={
          hasMoreFollowers && (
            <Button style={{ width: '100%' }} onClick={loadMoreFollowers}>
              더보기
            </Button>
          )
        }
        bordered
        dataSource={followerList}
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card
              actions={[
                <Icon
                  key='stop'
                  type='stop'
                  onClick={removeFollower(item.id)}
                />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map(p => (
          <PostCard key={p.createdAt} post={p} />
        ))}
      </div>
    </div>
  );
};

Profile.getInitialProps = async context => {
  const state = context.store.getState();

  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
};

export default Profile;
