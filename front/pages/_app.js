import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from "next/head";
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';

const NodeBird = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.js" />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object,
};

// HOC of next-redux-wrapper
export default withRedux((initialState, options) => {
    // customize store
    const middlewares = []; // reduxSagaMiddleware, thunkMiddleware ...
    const enhancer = compose(
        applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );

    const store = createStore(reducer, initialState, enhancer);
    return store;
})(NodeBird);