import * as types from '../action-types';

let initState= {
    userId: '',
    orderId: '',
    cart: [],
    orderPriceSum: '',
    addressId: '',
}
export default function (state=initState,actions) {
    switch (actions.type){
        case types.ADD_CART:
            return {...state,cart:actions.payload.cart,orderPriceSum:actions.payload.orderPriceSum}
        default:
            return state;
    }
}