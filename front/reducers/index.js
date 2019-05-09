import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// group별로 나눈 reducer들을 묶어주는 역할을 수행한다!
export default combineReducers({
    user,
    post,
});