import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import comments from './comments'
import session from './session'
import cart from './cart'
let reducers=combineReducers({
    session,
    comments,
    cart,
    router:routerReducer
})
export default reducers