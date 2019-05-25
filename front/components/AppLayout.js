import React, { useEffect } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import SignInForm from './SignInForm';
import UserProfile from './UserProfile';
import { LOAD_USER_REQUEST } from '../reducers/user';

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, []);

  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item key='home'>
          <Link href='/'>
            <a>NodeBird</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link href='/profile'>
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='mail'>
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Row gutter={16} style={{ margin: '10px' }}>
        <Col xs={0} md={0} lg={3} />
        <Col xs={24} md={6} lg={4}>
          {me ? <UserProfile /> : <SignInForm />}
        </Col>
        <Col xs={24} md={12} lg={10}>
          {children}
        </Col>
        <Col xs={24} md={6} lg={4}>
          <Link href='https://github.com/joonhak'>
            <a target='_blank'>Github</a>
          </Link>
        </Col>
        <Col xs={0} md={0} lg={3} />
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
