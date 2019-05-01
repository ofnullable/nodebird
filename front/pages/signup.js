import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from "next/head";
import { Form, Input, Checkbox, Button } from 'antd';


const Signup = () => {
  // custom hooks
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = (e) => {
      setter(e.target.value);
    };
    return [value, handler];
  };

  const [id, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [passwd, setPasswd] = useState('');
  const [passwdCheck, setPasswdCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({
      id,
      nick,
      passwd,
      passwdCheck,
      term
    });
    if (passwd !== passwdCheck) {
      setPasswdError(true);
      return;
    }
    if (!term) {
      setTermError(true);
      return
    }
  };

  /*
  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangeNick = (e) => {
    setNick(e.target.value);
  };
  */
  const onChangePasswd = (e) => {
    setPasswdError(e.target.value !== passwdCheck);
    setPasswd(e.target.value);
  };

  const onChangePasswdCheck = (e) => {
    setPasswdError(e.target.value !== passwd);
    setPasswdCheck(e.target.value);
  };

  const onChangeTerm = (e) => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.js" />
      </Head>
      <AppLayout>
        <Form onSubmit={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input name="user-id" value={id} required onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input name="user-nick" value={nick} required onChange={onChangeNick} />
          </div>
          <div>
            <label htmlFor="user-passwd">비밀번호</label>
            <br />
            <Input name="user-passwd" type="password" value={passwd} required onChange={onChangePasswd} />
          </div>
          <div>
            <label htmlFor="user-passwd-check">비밀번호 확인</label>
            <br />
            <Input name="user-passwd-check" type="password" value={passwdCheck} required onChange={onChangePasswdCheck} />
            {passwdError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다!</div>}
          </div>
          <div>
            <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의!</Checkbox>
            {termError && <div style={{ color: 'red' }}>약관에 동의해주세요!</div>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">가입하기</Button>
          </div>
        </Form>
      </AppLayout>
    </>
  )
};

export default Signup;