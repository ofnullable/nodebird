export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'joonak',
        },
        content: '첫번째 게시글',
        img: 'http://img.worksout.co.kr/upload/image/editor/20190430/201904301054390291.jpg',
        createdAt: Date.now(),
        Comments: [],
    }], // 화면에 보일 포스트 리스트
    imagePaths: [], // 이미지 미리보기 경로
    postAdded: false,
    commentAdded: false,
    isAddingPost: false, // 업로드 중 
    isAddingComment: false,
    addPostErrorReason: '', // 실패 사유
    addCommentErrorReason: '',
};

const dummyPost = {
    id: 2,
    User: {
        id: 1,
        nickname: 'jooonak',
    },
    content: 'Dummy Content',
    createdAt: Date.now(),
    Comments: [],
};

const dummyComment = {
    id: 1,
    User: {
        id: 1,
        nickname: 'jooonak',
    },
    content: 'Dummy Comment',
    createdAt: Date.now(),
}

export const ADD_DUMMY = 'ADD_DUMMY';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST';
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS';
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
// 수정은 숙제

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                postAdded: false,
                isAddingPost: true,
                addPostErrorReason: '',
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                postAdded: true,
                isAddingPost: false,
                mainPosts: [dummyPost, ...state.mainPosts],
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                isAddingPost: false,
                addPostErrorReason: action.error,
            };
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                commentAdded: false,
                isAddingComment: true,
                addCommentErrorReason: '',
            };
        case ADD_COMMENT_SUCCESS:
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Comments = [...post.Comments, dummyComment];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Comments };
            return {
                ...state,
                mainPosts,
                commentAdded: true,
                isAddingComment: false,
            };
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                isAddingComment: false,
                addCommentErrorReason: action.error,
            };
        default:
            return state;
    }
};