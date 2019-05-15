import React, { useCallback } from 'react';
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {

    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);

    const onSignOut = useCallback(() => {
        dispatch({
            type: SIGN_OUT_REQUEST,
        });
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{me.Post.length}</div>,
                <div key="following">팔로잉<br />{me.Followings.length}</div>,
                <div key="followers">팔로워<br />{me.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onSignOut}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;