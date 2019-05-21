import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    state => state.post
  );
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const fileInput = useRef();

  useEffect(() => {
    setText('');
  }, [postAdded === true]);

  const buttonClick = useCallback(e => {
    e.preventDefault();
    fileInput.current.click();
  }, []);

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      if (!text || !text.trim()) return alert('Please enter content');
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: text
        }
      });
    },
    [text]
  );

  return (
    <Form
      style={{ marginBottom: '20px' }}
      encType="multipart/form-data"
      onSubmit={onSubmitForm}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder=""
      />
      <div>
        <input type="file" ref={fileInput} multiple hidden />
        <Button onClick={buttonClick}>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          loading={isAddingPost}
          htmlType="submit"
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '280px' }}
              alt={v}
            />
            <div />
            <Button>제거</Button>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
