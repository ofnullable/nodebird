import axios from 'axios';
import {
  all,
  call,
  put,
  fork,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user';

function signUpApi(signUpData) {
  return axios.post('/user/', signUpData);
}

function* signUp({ data }) {
  try {
    yield call(signUpApi, data);
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

function signInApi(signInData) {
  // server에 요청
  return axios.post('/user/sign-in', signInData, {
    withCredentials: true,
  });
}

function* signIn({ data }) {
  try {
    const res = yield call(signInApi, data); // server의 응답을 받기 위해 동기로 api 호출
    yield put({
      // dispatch와 동일, Action이 실행된다.
      type: SIGN_IN_SUCCESS,
      data: res.data,
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

function signOutApi() {
  // server에 요청
  return axios.post(
    '/user/sign-out',
    {},
    {
      withCredentials: true,
    },
  );
}

function* signOut() {
  try {
    yield call(signOutApi); // server의 응답을 받기 위해 동기로 api 호출
    yield put({
      // dispatch와 동일, Action이 실행된다.
      type: SIGN_OUT_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_OUT_FAILURE,
    });
  }
}

function* watchSignOut() {
  yield takeLatest(SIGN_OUT_REQUEST, signOut);
}

function loadUserApi(userId) {
  // server에 요청
  return axios.get(userId ? `/user/${userId}` : '/user/', {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserApi, action.data); // server의 응답을 받기 위해 동기로 api 호출
    yield put({
      // dispatch와 동일, Action이 실행된다.
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSage() {
  yield all([
    fork(watchSignUp),
    fork(watchSignIn),
    fork(watchSignOut),
    fork(watchLoadUser),
  ]);
}
