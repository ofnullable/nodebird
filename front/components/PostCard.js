import React, { useState, useCallback } from 'react';
import { Card, Icon, Button, Avatar, List, Comment, Popover } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import {
  LOAD_COMMENTS_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST,
} from '../store/reducers/post';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostEditModal from './PostEditModal';
moment.locale('ko');

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const id = useSelector((state) => state.user.me && state.user.me.id);
  const dispatch = useDispatch();

  const liked = id && post.Likers && post.Likers.find((l) => l.id === id);

  const toggleCommentForm = useCallback(() => {
    setCommentFormOpened((prev) => {
      if (!prev) {
        dispatch({
          type: LOAD_COMMENTS_REQUEST,
          postId: post.id,
        });
      }
      return !prev;
    });
  }, []);

  const toggleLike = useCallback(() => {
    if (!id) {
      return alert('Sign in first!');
    }
    if (liked) {
      return dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    } else {
      return dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  }, [id, post && post.id, liked]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('Sign in first!');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id, post.id]);

  const removePost = useCallback((postId) => () => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: postId,
    });
  });

  const showModal = useCallback(() => {
    setModalVisible(true);
  });

  const closeModal = useCallback(() => {
    setModalVisible(false);
  });

  return (
    <div style={{ marginBottom: '20px' }}>
      <PostEditModal
        visible={modalVisible}
        closeModal={closeModal}
        postId={post.id}
        postContent={post.content}
      />
      <Card
        cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon
            type="heart"
            key="heart"
            onClick={toggleLike}
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor="#eb2f96"
          />,
          <Icon type="message" key="message" onClick={toggleCommentForm} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id && post.UserId === id ? (
                  <div>
                    <Button onClick={showModal}>수정</Button>
                    <Button type="danger" onClick={removePost(post.id)}>
                      삭제
                    </Button>
                  </div>
                ) : (
                  <Button type="danger">신고</Button>
                )}
              </Button.Group>
            }
          >
            <Icon type="ellipsis" />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 Retweet` : null}
        extra={<FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <span style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD hh:mm:ss')}
            </span>
            <Card.Meta
              avatar={
                <Link
                  href={{
                    pathname: `/user`,
                    query: { id: post.Retweet.User.id },
                  }}
                  as={`/user/${post.Retweet.User.id}`}
                >
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postContent={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <span style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD hh:mm:ss')}
            </span>
            <Card.Meta
              avatar={
                <Link
                  href={{ pathname: `/user`, query: { id: post.User.id } }}
                  as={`/user/${post.User.id}`}
                >
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postContent={post.content} />}
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link
                      href={{ pathname: `/user`, query: { id: item.User.id } }}
                      as={`/user/${item.User.id}`}
                    >
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    Comments: PropTypes.array,
    Retweet: PropTypes.object,
    RetweetId: PropTypes.number,
    img: PropTypes.string,
    Images: PropTypes.array,
    Likers: PropTypes.array,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
