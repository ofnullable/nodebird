import produce from 'immer';

export const initialState = {
  mainPosts: [], // 화면에 보일 포스트 리스트
  imagePaths: [], // 이미지 미리보기 경로
  postAdded: false,
  isAddingPost: false, // 업로드 중
  addPostErrorReason: '', // 실패 사유
  commentAdded: false,
  isAddingComment: false,
  addCommentErrorReason: '',
  hasMorePosts: false,
};

// 중복방지를 위한 prefix 추가
export const REMOVE_IMAGE = 'POST/REMOVE_IMAGE';

export const UPLOAD_IMAGES_REQUEST = 'POST/UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'POST/UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'POST/UPLOAD_IMAGES_FAILURE';

export const ADD_POST_REQUEST = 'POST/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'POST/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'POST/ADD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'POST/LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'POST/LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'POST/LOAD_MAIN_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'POST/LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'POST/LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'POST/LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'POST/LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'POST/LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'POST/LOAD_HASHTAG_POSTS_FAILURE';

export const LIKE_POST_REQUEST = 'POST/LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'POST/LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'POST/LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'POST/UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'POST/UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'POST/UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'POST/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'POST/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'POST/ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'POST/LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'POST/LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'POST/LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = 'POST/RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'POST/RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'POST/RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'POST/REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'POST/REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'POST/REMOVE_POST_FAILURE';
// 수정은 숙제

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case REMOVE_IMAGE: {
        const index = draft.imagePaths.findIndex((v, i) => i === action.index);
        draft.imagePaths.splice(index, 1);
        break;
      }
      case UPLOAD_IMAGES_SUCCESS:
        action.data.forEach(d => draft.imagePaths.push(d));
        break;
      case ADD_POST_REQUEST:
        draft.postAdded = false;
        draft.isAddingPost = true;
        draft.addPostErrorReason = '';
        break;
      case ADD_POST_SUCCESS:
        draft.postAdded = true;
        draft.isAddingPost = false;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.isAddingPost = false;
        draft.addPostErrorReason = action.error;
        break;
      case REMOVE_POST_SUCCESS: {
        const index = draft.mainPosts.findIndex(p => p.id === action.data);
        draft.mainPosts.splice(index, 1);
      }
      case LOAD_MAIN_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
        draft.mainPosts = action.lastId ? draft.mainPosts : [];
        draft.hasMorePosts = action.lastId ? draft.hasMorePosts : true;
        break;
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
        action.data.forEach(d => {
          draft.mainPosts.push(d);
        });
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_COMMENTS_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          p => p.id === action.data.postId
        );
        draft.mainPosts[postIndex].Comments = action.data.comments;
        break;
      }
      case ADD_COMMENT_REQUEST:
        draft.isAddingComment = true;
        draft.addCommentErrorReason = '';
        draft.commentAdded = false;
        break;
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          p => p.id === action.data.postId
        );
        draft.mainPosts[postIndex].Comments.push(action.data.comment);
        draft.isAddingComment = false;
        draft.commentAdded = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.isAddingComment = false;
        draft.addCommentErrorReason = action.error;
        break;
      case LIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          p => p.id === action.data.postId
        );
        draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          p => p.id === action.data.postId
        );
        const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(
          l => l.id === action.data.userId
        );
        draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
        break;
      }
      case RETWEET_SUCCESS:
        draft.mainPosts.unshift(action.data);
      default:
        break;
    }
  });
};
