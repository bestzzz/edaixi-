import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import session from './session'
let reducers=combineReducers({
    session,
    // 小的仓库名,
    router:routerReducer
});
export default reducers