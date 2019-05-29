import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd/lib/radio';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onFollow = useCallback(
    userId => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );
  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  return !me || post.UserId === me.id ? null : me.Followings &&
    me.Followings.find(f => f.id === post.User.id) ? (
    <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
  ) : (
    <Button onClick={onFollow(post.User.id)}>팔로우</Button>
  );
};

export default FollowButton;
