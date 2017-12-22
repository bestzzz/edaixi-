import * as types from '../action-types'

let initState={
    users:[{ID:''}]
};

export default function (state=initState,action) {
    switch (action.type){
        case types.ADD_ADDRESS:
            return{
                ...state,
                users:[...state.users,action.payload]
            };
        case types.ADDRESSES:
            return{
                ...state,
                users:action.payload
            };
        case types.DELADDRESS:
            return{
                ...state,
                users:action.payload
            };
        default:
            return state
    }
}