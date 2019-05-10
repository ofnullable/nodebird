import React, { useCallback } from 'react';
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../reducers/user';

const UserProfile = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const onSignOut = useCallback(() => {
        dispatch(signOutAction);
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{user.Post.length}</div>,
                <div key="following">팔로잉<br />{user.Followings.length}</div>,
                <div key="followers">팔로워<br />{user.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title={user.nickname}
            />
            <Button onClick={onSignOut}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;