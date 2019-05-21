import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  Icon,
  Button,
  Avatar,
  Form,
  Input,
  List,
  Comment,
  Popover,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../reducers/post';
import PostImages from './PostImages';

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const liked = me && post.Likers && post.Likers.find(l => l.id === me.id);

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  const onToggleCommentForm = useCallback(() => {
    setCommentFormOpened(prev => {
      if (!prev) {
        dispatch({
          type: LOAD_COMMENTS_REQUEST,
          postId: post.id,
        });
      }
      return !prev;
    });
  }, []);

  const onSubmitComment = useCallback(
    e => {
      e.preventDefault();
      if (!me) {
        return alert('Sign in first!');
      }
      return dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          content: commentText,
        },
      });
    },
    [me && me.id, commentText],
  );

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  }, []);

  const toggleLike = useCallback(() => {
    if (!me) {
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
  }, [me && me.id, post && post.id, liked]);

  return (
    <div>
      <Card
        key={post.createdAt}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type='retweet' key='retweet' />,
          <Icon
            type='heart'
            key='heart'
            onClick={toggleLike}
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor='#eb2f96'
          />,
          <Icon type='message' key='message' onClick={onToggleCommentForm} />,
          <Popover
            key='ellipsis'
            content={
              <Button.Group>
                {me && post.UserId === me.id ? (
                  <div>
                    <Button>수정</Button>
                    <Button type='danger'>삭제</Button>
                  </div>
                ) : (
                  <Button type='danger'>신고</Button>
                )}
              </Button.Group>
            }
          >
            <Icon type='ellipsis' />
          </Popover>,
        ]}
        extra={<Button>팔로우</Button>}
      >
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
          description={
            <div>
              {post.content.split(/(#[^\s]+)/g).map(v => {
                if (v.match(/#[^\s]+/)) {
                  return (
                    <Link
                      href={{
                        pathname: `/hashtag`,
                        query: { tag: v.slice(1) },
                      }}
                      as={`/hashtag/${v.slice(1)}`}
                      key={v}
                    >
                      <a>{v}</a>
                    </Link>
                  );
                }
                return v;
              })}
            </div>
          }
        />
      </Card>
      {commentFormOpened && (
        <div>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
            </Form.Item>
            <Button type='primary' htmlType='submit' loading={isAddingComment}>
              삐약
            </Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments || []}
            renderItem={item => (
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
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
