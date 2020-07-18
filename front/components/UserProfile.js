import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT_REQUEST } from '../store/reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isSigningOut } = useSelector((state) => state.user);

  const onSignOut = useCallback(() => {
    dispatch({
      type: SIGN_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      actions={[
        <Link href="/profile" key="twit">
          <a>
            <div>
              짹짹
              <br />
              {me.Posts.length}
            </div>
          </a>
        </Link>,
        <Link href="/profile" key="following">
          <a>
            <div>
              팔로잉
              <br />
              {me.Followings.length}
            </div>
          </a>
        </Link>,
        <Link href="/profile" key="followers">
          <a>
            <div>
              팔로워
              <br />
              {me.Followers.length}
            </div>
          </a>
        </Link>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button onClick={onSignOut} loading={isSigningOut}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
