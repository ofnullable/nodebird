const dummyUser = {
    id: 1,
    nickname: 'jooonak',
    Post: [''],
    Followings: ['', '', ''],
    Followers: ['', '', ''],
};
// store, state의 모양 정의 ( 초기값 )
export const initialState = {
    signedUp: false,       // 회원가입 성공
    isSignIn: false,       // 로그인 여부
    isSigningUp: false,    // 시도중
    isSigningIn: false,
    isSigningOut: false,
    signInErrorReason: '', // 실패사유
    signUpErrorReason: '',
    me: null,
    followingList: [],
    followerList: [],
    userInfo: null,        // 다른사람의 정보
};

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';  // Action의 이름
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

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
                isSignIn: true,
                isLoading: false,
                isSigningIn: false,
            }
        case SIGN_IN_FAILURE:
            return {
                ...state,
                me: null,
                isSignIn: false,
                isSigningIn: false,
                signInErrorReason: action.error,
            }
        case SIGN_OUT_REQUEST:
            return {
                ...state,
                isSignIn: false,
                me: null,
                isLoading: true,
            };
        default:
            return {
                ...state
            };
    };
};