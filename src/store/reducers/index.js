import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import session from './session'
import  address from './address'
let reducers=combineReducers({
    session,
    address,
    // 小的仓库名,
    router:routerReducer
});
export default reducers