import * as types from '../action-types'

let initState={
    users:[]
};

export default function (state=initState,action) {
    switch (action.type){
        case types.ADD_ADDRESS:
            console.log(state);
            console.log(action);
            return{
                ...state,
                users:[...state.users,action.payload]
            };
        default:
            return state
    }
}