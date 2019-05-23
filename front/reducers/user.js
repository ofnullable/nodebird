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

// 동적인 data는 함수로 action을 return한다.
// export const signUpRequestAction = data => ({
//     type: SIGN_UP_REQUEST,
//     data: data,
// });
// export const signInRequestAction = data => ({
//     type: SIGN_IN_REQUEST,
//     data: dummyUser,
// });
// export const signOutAction = {
//     type: SIGN_OUT_REQUEST,
// };

// reducer, setState와 비슷하다고 생각하면 된다.
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpData: action.data,
        isSignedUp: false,
        isSigningUp: true,
        signUpErrorReason: '',
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpData: action.data,
        isSignedUp: true,
        isSigningUp: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error,
      };
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isSigningIn: true,
        signInErrorReason: '',
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        me: action.data,
        isSigningIn: false,
        isSigningIn: false,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        me: null,
        isSigningIn: false,
        signInErrorReason: action.error,
      };
    case SIGN_OUT_REQUEST:
      return {
        ...state,
        isSigningOut: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        me: null,
        isSigningOut: false,
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        isSigningOut: false,
      };
    case LOAD_USER_SUCCESS:
      if (action.me) {
        return {
          ...state,
          me: action.data,
        };
      }
      return {
        ...state,
        userInfo: action.data,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          Followings: [{ id: action.data }, ...state.me.Followings],
        },
      };
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          Followings: state.me.Followings.filter(f => f.id !== action.data),
        },
        followingList: state.followingList.filter(f => f.id !== action.data),
      };
    case LOAD_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followerList: action.data,
      };
    case LOAD_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        followingList: action.data,
      };
    case REMOVE_FOLLOWER_SUCCESS:
      return {
        ...state,
        followerList: {
          ...state.me,
          Followers: state.me.Followers.filter(f => f.id !== action.data),
        },
        followerList: state.followerList.filter(f => f.id !== action.data),
      };
    case EDIT_NICKNAME_REQUEST:
      return {
        ...state,
        isEditingNickname: true,
        editNicknameErrorReason: '',
      };
    case EDIT_NICKNAME_SUCCESS:
      return {
        ...state,
        isEditingNickname: false,
        me: {
          ...state.me,
          nickname: action.data,
        },
      };
    case EDIT_NICKNAME_REQUEST:
      return {
        ...state,
        isEditingNickname: false,
        editNicknameErrorReason: action.error,
      };
    case ADD_POST:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    case REMOVE_POST:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter(p => p.id !== action.data),
        },
      };
    default:
      return {
        ...state,
      };
  }
};
