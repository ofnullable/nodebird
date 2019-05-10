import React from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SignInForm from './SignInForm';
import UserProfile from './UserProfile';

const AppLayout = ({ children }) => {

  const { isSignIn } = useSelector(state => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/"><a>NodeBird</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/profile"><a>Profile</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Row gutter={16} style={{ margin: '10px' }}>
        <Col xs={24} md={6}>
          {
            isSignIn
              ? <UserProfile />
              : <SignInForm />
          }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Link href="https://joonhak.github.io/react-blog">
            <a target="_blank">Blog</a>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;