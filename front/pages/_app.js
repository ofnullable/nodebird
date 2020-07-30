import React from 'react';
import App from 'next/app';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import AppLayout from '../components/AppLayout';
import { LOAD_USER_REQUEST } from '../store/reducers/user';
import wrapper from '../store/configureStore';

import 'antd/dist/antd.css';
import { END } from 'redux-saga';

const NodeBird = ({ Component, pageProps }) => {
  return (
    <>
      <Helmet
        title="nodebird"
        htmlAttributes={{ lang: 'ko' }}
        meta={[
          { charSet: 'UTF-8' },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
          },
          { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
          { name: 'description', content: ' SNS - Nodebird ' },
          { name: 'og:title', content: 'Nodebird' },
          { name: 'og:description', content: ' SNS - Nodebird ' },
          { property: 'og:type', content: 'website' },
          { property: 'og:image', content: '/static/favicon.ico' },
        ]}
        link={[
          { rel: 'shortcut icon', href: '/static/favicon.ico' },
          {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
          },
          {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
          },
          {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.css',
          },
        ]}
        // script={[
        //   {
        //     src: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.js',
        //   },
        // ]}
      />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object,
  pageProps: PropTypes.any,
};

/* 가장 중요한 코드! */
NodeBird.getInitialProps = async (context) => {
  const { ctx } = context;

  console.log('store:', ctx.store, ', end store');
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';

  if (ctx.isServer && cookie) {
    // 모든 axios 요청에 설정된다 공통부분 설정하면 좋을듯
    axios.defaults.headers.cookie = cookie;
  }

  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  const appProps = await App.getInitialProps(context);

  if (ctx.req) {
    ctx.store.dispatch(END);
    await ctx.store.sagaTask.toPromise();
  }
  return { ...appProps };
};

export default wrapper.withRedux(NodeBird);
