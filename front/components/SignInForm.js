import React, { useCallback, memo } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import { useInputText } from '../pages/signup';
import { useDispatch } from 'react-redux';
import { signInAction } from '../reducers/user';

const SignInForm = memo(() => {

    const [id, onChangeId] = useInputText('');
    const [passwd, onChangePasswd] = useInputText('');
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch(signInAction({
            id,
            passwd,
        }));
    }, [id, passwd]);

    return (
        <Form onSubmit={onSubmitForm}>
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
            <div style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    );
});

export default SignInForm;