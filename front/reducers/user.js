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

export const SIGN_UP = 'SIGN_UP';  // Action의 이름
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT = 'SIGN_OUT';

// 동적인 data는 함수로 action을 return한다.
export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    };
};

export const signUpSuccess = {
    type: SIGN_UP_SUCCESS,
};

export const signUpFailure = {
    type: SIGN_UP_FAILURE,
};

export const signInAction = (data) => {
    return {
        type: SIGN_IN,
        data: dummyUser,
    };
};

export const signOutAction = {
    type: SIGN_OUT,
};

// reducer, setState와 비슷하다고 생각하면 된다.
export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                signUpData: action.data,
            };
        case SIGN_IN:
            return {
                ...state,
                isSignIn: true,
                user: action.data,
            };
        case SIGN_OUT:
            return {
                ...state,
                isSignIn: false,
                user: null,
            };
        default:
            return state;
    };
};