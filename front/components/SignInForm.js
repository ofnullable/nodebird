import React, { useCallback } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useInputText } from '../pages/signup';
import { SIGN_IN_REQUEST } from '../store/reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const ErrorText = styled.div`
  color: red;
`;

const SignInForm = () => {
  const [id, onChangeId] = useInputText('');
  const [passwd, onChangePasswd] = useInputText('');
  const { isSigningIn, signInErrorReason } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: SIGN_IN_REQUEST,
      data: {
        userId: id,
        passwd,
      },
    });
  }, [id, passwd]);

  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="passwd">비밀번호</label>
        <br />
        <Input name="passwd" value={passwd} onChange={onChangePasswd} type="password" required />
      </div>
      <ErrorText>{signInErrorReason}</ErrorText>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={isSigningIn}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default SignInForm;
