import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UNFOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
} from '../store/reducers/user';
import PostCard from '../components/PostCard';
import NicknameEditForm from '../components/NicknameEditForm';
import { LOAD_USER_POSTS_REQUEST } from '../store/reducers/post';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { followerList, followingList, hasMoreFollowers, hasMoreFollowings } = useSelector(
    (state) => state.user
  );
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) {
      alert('Sign in first!');
      Router.push('/');
    }
  }, []);

  const unfollowUser = useCallback(
    (userId) => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const removeFollower = useCallback(
    (userId) => () => {
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
      <Head>
        <title>내 프로필 | nodebird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        hasMore={hasMoreFollowings}
        loadMore={loadMoreFollowings}
        data={followingList}
        remove={unfollowUser}
      />
      <FollowList
        header="팔로워"
        hasMore={hasMoreFollowers}
        loadMore={loadMoreFollowers}
        data={followerList}
        remove={removeFollower}
      />
      <div>
        {mainPosts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

Profile.getInitialProps = async (context) => {
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
