import * as types from '../action-types'

let initState={
    users:[{ID:''}],
    orders:[{addressId:''}]
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
        case types.GETORDER:
            return{
                ...state,
                orders:action.payload
            };
        case types.GETADDRESS:
            return{
                ...state,
                orderAddress:action.payload
            };
        case types.GETPRODUCT:
            return{
                ...state,
                products:action.payload
            };
        case types.REVISEADDRESS:
            return{
                ...state,
                users:action.payload
            };
        default:
            return state
    }
}