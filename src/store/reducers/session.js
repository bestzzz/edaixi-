import * as types from '../action-types'

let initState={
    err:'',
    success:'',
    user:{userId:''},
};

export default function (state=initState,action) {
    switch (action.type){
        case types.REG:
            return{
                ...action.payload
            };
        case types.LOGIN:
            return{
                ...action.payload
            };
        case types.LOGOUT:
            return{
                ...action.payload
            };
        case types.CLEAR_MESSAGES:
            return{
                ...state,
                err:'',
                success:''
            };
        case types.VALIDATE:
            return{
                ...state,
                ...action.payload
            };
        case types.UPLOADIMAGE:
            debugger
            return{
                ...action.payload
            };
        default:
            return state;
    }
}