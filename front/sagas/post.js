import axios from 'axios';
import { all, call, fork, takeLatest, put, delay } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';

function uploadImagesApi(formData) {
  // upload한 file path들을 받음
  return axios.post(`/post/images`, formData, {
    withCredentials: true,
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesApi, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function addPostApi(postData) {
  return axios.post('/post', postData, {
    withCredentials: true, // 로그인 한 사람만 작성 가능
  });
}

function* addPost({ data }) {
  try {
    const result = yield call(addPostApi, data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadMainPostsApi() {
  return axios.get('/posts');
}

function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsApi);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function loadUserPostsApi(id) {
  return axios.get(`/user/${id}/posts`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsApi, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function loadHashtagPostsApi(tag) {
  return axios.get(`/posts/${tag}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsApi, action.data);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function loadCommentsApi(postId) {
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsApi, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data,
        comments: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function addCommentApi(data) {
  return axios.post(
    `/post/${data.postId}/comment`,
    { content: data.content },
    {
      withCredentials: true,
    }
  );
}

function* addComment(action) {
  try {
    const result = yield call(addCommentApi, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comments: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function likePostApi(postId) {
  return axios.post(
    `/post/${postId}/like`,
    {},
    {
      withCredentials: true,
    }
  );
}

function* likePost(action) {
  try {
    // file path들을 받음
    const result = yield call(likePostApi, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        userId: result.data.userId,
        postId: action.data,
      },
    });
  } catch (e) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function unlikePostApi(postId) {
  return axios.delete(`/post/${postId}/like`, {
    withCredentials: true,
  });
}

function* unlikePost(action) {
  try {
    // file path들을 받음
    const result = yield call(unlikePostApi, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        userId: result.data.userId,
        postId: action.data,
      },
    });
  } catch (e) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e,
    });
    console.error(e);
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function retweetApi(postId) {
  return axios.post(
    `/post/${postId}/retweet`,
    {},
    {
      withCredentials: true,
    }
  );
}

function* retweet(action) {
  try {
    // file path들을 받음
    const result = yield call(retweetApi, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: RETWEET_FAILURE,
      error: e,
    });
    console.error(e);
    alert(e.response && e.response.data);
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchLoadMainPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadComments),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRetweet),
  ]);
}
