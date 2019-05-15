import { all, call, put, fork, takeLatest } from 'redux-saga/effects'
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../reducers/user';

function signInApi() {
    // server에 요청
    console.log('Sign in request..')
}

function* signIn() {
    console.log('Do sign in');
    try {
        yield call(signInApi); // server의 응답을 받기 위해 동기로 api 호출
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

function* watchSignUp() {

}

export default function* userSage() {
    yield all([
        fork(watchSignIn),
        fork(watchSignUp),
    ]);
}