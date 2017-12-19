import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import comments from './comments'
let reducers=combineReducers({
    // 小的仓库名,
    comments,
    router:routerReducer
})
export default reducers