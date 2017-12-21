import * as types from '../action-types';

let initState= {
    userId: '',
    orderId: '',
    cart: [
        // {
        //     proId: 1,
        //     counts: 1
        // },
    ],
    orderPriceSum: '',
    addressId: '',
}
export default function (state=initState,actions) {
    switch (actions.type){
        case types.ADD_CART:
            return {...state,cart:actions.payload}
        default:
            return state;
    }
}