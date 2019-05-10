export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'joonak',
        },
        content: '첫번째 게시글',
        img: 'http://img.worksout.co.kr/upload/image/editor/20190430/201904301054390291.jpg',
        createdAt: Date.now(),
    }],
    imagePaths: [],
};

export const ADD_DUMMY = 'ADD_DUMMY';
export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPost = {
    type: ADD_POST,
    data: {},
};

export const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hi',
        UserId: 1,
        User: {
            nickname: 'joonak',
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            };
        case ADD_DUMMY:
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            };
        default:
            return state;
    }
};