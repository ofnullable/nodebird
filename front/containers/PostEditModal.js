import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Input } from 'antd';
import { EDIT_POST_REQUEST } from '../reducers/post';

const PostEditModal = ({ visible, closeModal, postId, postContent }) => {
  const [content, setContent] = useState(postContent);
  const dispatch = useDispatch();

  const contentChange = useCallback(
    e => {
      setContent(e.target.value);
    },
    [content]
  );

  const submitChange = () => {
    dispatch({
      type: EDIT_POST_REQUEST,
      postId,
      content,
    });
    closeModal();
  };

  return (
    <Modal
      centered
      title='edit post'
      visible={visible}
      onOk={submitChange}
      onCancel={closeModal}
      bodyStyle={{ padding: '10px' }}
    >
      <Input.TextArea
        value={content}
        maxLength={140}
        onChange={contentChange}
      />
    </Modal>
  );
};

export default PostEditModal;
