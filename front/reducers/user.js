// store, state의 모양 정의 ( 초기값 )
export const initialState = {
    isLoggedIn: false,
    user: {},
};

export const SIGN_IN = 'SIGN_IN';  // Action의 이름
export const SIGN_OUT = 'SIGN_OUT';

export const loginAction = {
    type: SIGN_IN,
    data: {
        nickname: 'joonak',
    },
};

export const logoutAction = {
    type: SIGN_OUT,
};

// reducer, setState와 비슷하다고 생각하면 된다.
export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            };
        case SIGN_OUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    };
};