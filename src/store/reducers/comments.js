import * as types from '../action-types';

let stateInit={
    pageIndex:1,
    perPage:6,
    coms:[],
    hasMore:true,
    loading:false
};

export default function (state=stateInit,actions) {
    switch(actions.type){
        case types.AXIOS_COMMENTS:
        return {
        ...state,

            loading:true
        };
        case types.AXIOS_COMMENTS_SUCCESS:
            return{
                ...state,
                coms:[...state.coms,...actions.payload.coms],
                pageIndex:state.pageIndex+1,
                hasMore:actions.payload.hasMore,
                loading:false
            };
        case types.REFRESH_COMMENTS:
            return{
                ...state,
                coms:[],
                loading:true
            };
        case types.REFRESH_COMMENTS_SUCCESS:
            return{
                ...state,
                coms:[...actions.payload.coms],
                pageIndex:state.pageIndex+1,
                hasMore:actions.payload.hasMore,
                loading:false
            };
        default:
            return state
    }
}
