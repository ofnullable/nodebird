import produce from 'immer';
// store, state의 모양 정의 ( 초기값 )
export const initialState = {
  signedUp: false, // 회원가입 성공
  isSigningUp: false, // 시도중
  isSigningIn: false,
  isSigningOut: false,
  signInErrorReason: '', // 실패사유
  signUpErrorReason: '',
  me: null,
  followingList: [],
  followerList: [],
  userInfo: null, // 다른사람의 정보
  isEditingNickname: false,
  editNicknameErrorReason: '',
  hasMoreFollowers: false,
  hasMoreFollowings: false,
};

export const ADD_POST = 'USER/ADD_POST';
export const REMOVE_POST = 'USER/REMOVE_POST';

export const SIGN_UP_REQUEST = 'USER/SIGN_UP_REQUEST'; // Action의 이름
export const SIGN_UP_SUCCESS = 'USER/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'USER/SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'USER/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'USER/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'USER/SIGN_IN_FAILURE';

export const SIGN_OUT_REQUEST = 'USER/SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'USER/SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'USER/SIGN_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'USER/LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'USER/LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'USER/LOAD_USER_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'USER/LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'USER/LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'USER/LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'USER/LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'USER/LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'USER/LOAD_FOLLOWINGS_FAILURE';

export const FOLLOW_USER_SUCCESS = 'USER/FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_REQUEST = 'USER/FOLLOW_USER_REQUEST';
export const FOLLOW_USER_FAILURE = 'USER/FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'USER/UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'USER/UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'USER/UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'USER/REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'USER/REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'USER/REMOVE_FOLLOWER_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'USER/EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'USER/EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'USER/EDIT_NICKNAME_FAILURE';

// reducer, setState와 비슷하다고 생각하면 된다.
export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.isSignedUp = false;
        draft.isSigningUp = true;
        draft.signUpErrorReason = '';
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpData = action.data;
        draft.isSignedUp = true;
        draft.isSigningUp = false;
        break;
      case SIGN_UP_FAILURE:
        draft.isSigningUp = false;
        draft.signUpErrorReason = action.error;
        break;
      case SIGN_IN_REQUEST:
        draft.isSigningIn = true;
        draft.signInErrorReason = '';
        break;
      case SIGN_IN_SUCCESS:
        draft.me = action.data;
        draft.isSigningIn = false;
        break;
      case SIGN_IN_FAILURE:
        draft.me = null;
        draft.isSigningIn = false;
        draft.signInErrorReason = action.reason;
        break;
      case SIGN_OUT_REQUEST:
        draft.isSigningOut = true;
        break;
      case SIGN_OUT_SUCCESS:
        draft.me = null;
        draft.isSigningOut = false;
        break;
      case SIGN_OUT_FAILURE:
        draft.isSigningOut = false;
        break;
      case LOAD_USER_SUCCESS:
        if (action.me) {
          draft.me = action.data;
          break;
        }
        draft.userInfo = action.data;
        break;
      case FOLLOW_USER_SUCCESS:
        draft.me.Followings.unshift({ id: action.data });
        break;
      case UNFOLLOW_USER_SUCCESS: {
        const followingsIndex = draft.me.Followings.findIndex(
          f => f.id === action.data
        );
        draft.me.Followings.splice(followingsIndex, 1);
        const followingListIndex = draft.followingList.findIndex(
          f => f.id === action.data
        );
        draft.followingList.splice(followingListIndex, 1);
        break;
      }
      case LOAD_FOLLOWERS_REQUEST:
        draft.followerList = action.offset ? draft.followerList : [];
        draft.hasMoreFollowers = action.offset ? draft.hasMoreFollowers : true;
        break;
      case LOAD_FOLLOWERS_SUCCESS:
        action.data.forEach(d => draft.followerList.push(d));
        draft.hasMoreFollowers = action.data.length === 3;
        break;
      case LOAD_FOLLOWINGS_REQUEST:
        draft.followingList = action.offset ? draft.followingList : [];
        draft.hasMoreFollowings = action.offset
          ? draft.hasMoreFollowings
          : true;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
        action.data.forEach(d => draft.followingList.push(d));
        draft.hasMoreFollowings = action.data.length === 3;
        break;
      case REMOVE_FOLLOWER_SUCCESS: {
        const followersIndex = draft.me.Followers.findIndex(
          f => f.id === action.data
        );
        draft.me.Followers.splice(followersIndex, 1);
        const followerListIndex = draft.followerList.findIndex(
          f => f.id === action.data
        );
        draft.followerList.splice(followerListIndex, 1);
        break;
      }
      case EDIT_NICKNAME_REQUEST:
        draft.isEditingNickname = true;
        draft.editNicknameErrorReason = '';
        break;
      case EDIT_NICKNAME_SUCCESS:
        draft.isEditingNickname = false;
        draft.me.nickname = action.data;
        break;
      case ADD_POST:
        draft.me.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST: {
        const index = draft.me.Posts.findIndex(p => p.id === action.data);
        draft.me.Posts.splice(index, 1);
        break;
      }
      default:
        return {
          ...state,
        };
    }
  });
};
