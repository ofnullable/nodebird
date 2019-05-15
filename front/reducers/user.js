const dummyUser = {
    nickname: 'jooonak',
    Post: [''],
    Followings: ['', '', ''],
    Followers: ['', '', ''],
};
// store, state의 모양 정의 ( 초기값 )
export const initialState = {
    isSignIn: false,
    user: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';  // Action의 이름
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

// 동적인 data는 함수로 action을 return한다.
export const signUpAction = (data) => {
    return {
        type: SIGN_UP_REQUEST,
        data: data,
    };
};

export const signInAction = (data) => {
    return {
        type: SIGN_IN_REQUEST,
        data: dummyUser,
    };
};

export const signOutAction = {
    type: SIGN_OUT_REQUEST,
};

// reducer, setState와 비슷하다고 생각하면 된다.
export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            return {
                ...state,
                signUpData: action.data,
                isLoading: true,
            };
        case SIGN_IN_REQUEST:
            return {
                ...state,
                isSignIn: true,
                user: action.data,
                isLoading: true,
            };
        case SIGN_OUT_REQUEST:
            return {
                ...state,
                isSignIn: false,
                user: null,
                isLoading: true,
            };
        default:
            return {
                ...state
            };
    };
};