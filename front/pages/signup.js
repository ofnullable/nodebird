import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

// custom hooks
export const useInputText = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const Signup = () => {

  const [id, onChangeId] = useInputText('');
  const [nick, onChangeNick] = useInputText('');
  const [passwd, setPasswd] = useState('');
  const [passwdCheck, setPasswdCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (passwd !== passwdCheck) {
      setPasswdError(true);
      return;
    }
    if (!term) {
      setTermError(true);
      return
    }
  }, [passwd, passwdCheck, term]);

  /*
  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangeNick = (e) => {
    setNick(e.target.value);
  };
  */
  const onChangePasswd = useCallback((e) => {
    setPasswdError(e.target.value !== passwdCheck);
    setPasswd(e.target.value);
  }, [passwd, passwdCheck]);

  const onChangePasswdCheck = useCallback((e) => {
    setPasswdError(e.target.value !== passwd);
    setPasswdCheck(e.target.value);
  }, [passwd, passwdCheck]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, [term]);

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nick} onChange={onChangeNick} required />
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
    </>
  )
};

export default Signup;