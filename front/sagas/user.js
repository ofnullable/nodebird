import axios from 'axios';
import { all, call, put, fork, takeLatest, delay } from 'redux-saga/effects'
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';

function signUpApi() {
    console.log('Sign up request..');
    // return axios.post('/sign-up');
}

function* signUp() {
    try {
        yield call(signUpApi);
        yield delay(1000);
        throw new Error('king부러');
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function signInApi() {
    // server에 요청
    console.log('Sign in request..');
    // return axios.post('/sign-in');
}

function* signIn() {
    try {
        yield call(signInApi); // server의 응답을 받기 위해 동기로 api 호출
        yield delay(1000);
        yield put({ // dispatch와 동일, Action이 실행된다.
            type: SIGN_IN_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_IN_FAILURE,
        });
    }
}

function* watchSignIn() {
    yield takeLatest(SIGN_IN_REQUEST, signIn);
}

export default function* userSage() {
    yield all([
        fork(watchSignIn),
        fork(watchSignUp),
    ]);
};