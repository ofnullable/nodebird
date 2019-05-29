import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Menu, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SignInForm from '../containers/SignInForm';
import UserProfile from '../containers/UserProfile';

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user);

  const onSearch = value => {
    Router.push(
      { pathname: '/hashtag', query: { tag: encodeURIComponent(value) } },
      `/hashtag/${encodeURIComponent(value)}`
    );
  };

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
          <Input.Search
            enterButton
            style={{ verticalAlign: 'middle' }}
            onSearch={onSearch}
          />
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
