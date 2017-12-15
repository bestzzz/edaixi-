import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
let reducers=combineReducers({
    // 小的仓库名,
    router:routerReducer
})
export default reducers