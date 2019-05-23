import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';

const PostForm = () => {
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    state => state.post,
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

  // TODO: https://ant.design/components/upload/ antd upload component 확인 후 적용해보기!
  const onFileInputChange = e => {
    const imageData = new FormData();

    // === Array().forEach.call()
    [].forEach.call(e.target.files, f => {
      imageData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageData,
    });
  };

  const imageRemove = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index,
      });
    },
    [],
  );

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      if (!text || !text.trim()) return alert('Please enter content');
      const formData = new FormData();
      imagePaths.forEach(p => {
        formData.append('image', p);
      });
      formData.append('content', text);
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [text, imagePaths],
  );

  return (
    <Form
      style={{ marginBottom: '20px' }}
      encType='multipart/form-data'
      onSubmit={onSubmitForm}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder=''
      />
      <div>
        <input
          type='file'
          ref={fileInput}
          multiple
          hidden
          onChange={onFileInputChange}
        />
        <Button onClick={buttonClick}>이미지 업로드</Button>
        <Button
          type='primary'
          style={{ float: 'right' }}
          loading={isAddingPost}
          htmlType='submit'
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:8000/${v}`}
              style={{ width: '280px' }}
              alt={v}
            />
            <div />
            <Button onClick={imageRemove(i)}>제거</Button>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
