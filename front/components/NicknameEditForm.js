import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { EDIT_NICKNAME_REQUEST } from '../store/reducers/user';

const NicknameEditForm = () => {
  const [editNickname, setEditNickname] = useState('');
  const { me, isEditingNickname } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onChangeNickname = useCallback((e) => {
    setEditNickname(e.target.value);
  }, []);

  const onEditNickname = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: EDIT_NICKNAME_REQUEST,
        data: editNickname,
      });
    },
    [editNickname]
  );

  return (
    <Form
      style={{
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '20px',
      }}
      onSubmit={onEditNickname}
    >
      <Input
        addonBefore="닉네임"
        value={editNickname || (me && me.nickname)}
        onChange={onChangeNickname}
      />
      <Button htmlType="submit" type="primary" loading={isEditingNickname}>
        수정
      </Button>
    </Form>
  );
};

export default NicknameEditForm;
